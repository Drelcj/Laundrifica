// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { Database } from '@/types/database';

// Define the protected routes and the roles that can access them
const protectedRoutes = {
  '/admin': ['admin'],
  '/agent': ['admin', 'delivery_agent'], // Admins can also access agent dashboard
  '/dashboard': ['admin', 'delivery_agent', 'user'], // All logged-in users can access the base dashboard
};

type Role = Database['public']['Enums']['user_role'];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Get the current user session
  const { data: { session } } = await supabase.auth.getSession();

  const user = session?.user;
  const { pathname } = request.nextUrl;

  // Find if the current path is a protected route
  const protectedPath = Object.keys(protectedRoutes).find(path => pathname.startsWith(path));

  if (protectedPath) {
    // 1. If no user is logged in, redirect to the login page
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // 2. If user is logged in, get their role from the 'profiles' table
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      // Could not fetch profile or profile doesn't exist, redirect to login as a failsafe
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const userRole = profile.role as Role;
    const allowedRoles = protectedRoutes[protectedPath as keyof typeof protectedRoutes];

    // 3. Check if the user's role is in the list of allowed roles for this path
    if (!allowedRoles.includes(userRole)) {
  // User's role is not authorized for this route.
  // We will redirect them to their own specific dashboard for a better UX.
  let destination = '/login'; // Default to login if something is wrong
  switch (userRole) {
    case 'admin':
      destination = '/dashboard/admin'; // Should not happen, but for safety
      break;
    case 'delivery_agent':
      destination = '/dashboard/agent';
      break;
    case 'user':
      destination = '/dashboard/user';
      break;
  }
  return NextResponse.redirect(new URL(destination, request.url));
}

  // If it's not a protected route, or if the user is authorized, continue
  return response;
}
}

// Configure the matcher to run the middleware on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
