// middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          response.cookies.set({ name, value, ...options })
        },
        remove: (name, options) => {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Crucially, this refreshes the session cookie and gets user data
  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // If the user is logged in, fetch their role from the profiles table
  let userRole = 'user'; // Default role
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (profile) {
      userRole = profile.role;
    }
  }

  // Define protected routes for different roles
  const adminRoutes = ['/dashboard/admin'];
  const agentRoutes = ['/delivery-agent'];
  const userRoutes = ['/dashboard', '/checkout', '/order-history'];

  // Role-based redirection logic
  if (adminRoutes.some(route => pathname.startsWith(route)) && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith('/delivery-agent') && userRole !== 'delivery_agent' && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect unauthenticated users from generic protected routes
  if (!user && userRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  // Redirect authenticated users from login/signup pages
  if (user && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}