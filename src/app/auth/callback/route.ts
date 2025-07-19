// src/app/auth/callback/route.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const redirect = searchParams.get('redirect') ?? '/cart';

  // Validate redirect URL to prevent open redirect vulnerabilities
  const allowedRedirects = ['/cart', '/checkout', '/dashboard', '/order-history'];
  const safeRedirect = allowedRedirects.includes(redirect) ? redirect : '/cart';

  if (code) {
    const cookieStore = await cookies(); // Await cookies() to resolve the promise
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            cookieStore.set({
              name,
              value,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: options.maxAge,
              path: '/',
            });
          },
          remove(name) {
            cookieStore.set({
              name,
              value: '',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
              maxAge: 0,
              path: '/',
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeRedirect}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`);
}