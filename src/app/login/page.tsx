// src/app/login/page.tsx
'use client'; // This is a client component because it uses hooks and handles user interaction

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client'; // Import Supabase client


// LoginPage component
export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // State for UI feedback
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/cart";

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push(redirectUrl);
        router.refresh();
      }
    };
    checkSession();
  }, [router, redirectUrl, supabase]);

  // --- HANDLER for Email/Password Login ---
     const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    router.push(redirectUrl);
    router.refresh();
  };

  // --- HANDLER for Social Logins (OAuth) ---
     const handleOAuthSignIn = async (provider: 'google' | 'facebook' | 'twitter') => {
    setIsLoading(true);
    setError(null);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback?redirect=${encodeURIComponent(redirectUrl)}`,
      },
    });
  };

  // Note: Phone/OTP login is a separate flow, it will be addressed after email/social is working.

     if (isLoading && !error) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 hero-gradient">
      <div className="absolute inset-0 dot-pattern opacity-30"></div>
      <motion.div
        className="max-w-md w-full space-y-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-bold gradient-text">Laundrilab</h2>
            </Link>
          </motion.div>
          <motion.h2 className="mt-6 text-3xl font-extrabold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Sign in to your account
          </motion.h2>
          <motion.p className="mt-2 text-sm text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            Or{" "}
            <Link href="/signup" className="font-medium text-primary hover:text-primary/80">
              create a new account
            </Link>
          </motion.p>
        </div>

        <motion.div
          className="glass-card p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="phone" disabled>Phone (Coming Soon)</TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="bg-background/50 backdrop-blur-sm border-white/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:text-primary/80">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="bg-background/50 backdrop-blur-sm border-white/20"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </label>
                </div>
                {/* Display any login errors here */}
                {error && (
                    <p className="text-sm text-red-500 bg-red-500/10 p-2 rounded-md border border-red-500/30">{error}</p>
                )}
                <Button type="submit" className="w-full mt-6 gradient-border overflow-hidden group" disabled={isLoading}>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative z-10 flex items-center justify-center">
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign in
                    </span>
                </Button>
              </form>
            </TabsContent>
            {/* Phone/OTP content remains for future implementation */}
          </Tabs>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Button variant="outline" className="bg-background/50 backdrop-blur-sm border-white/20" onClick={() => handleOAuthSignIn('google')} disabled={isLoading}>
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              <Button variant="outline" className="bg-background/50 backdrop-blur-sm border-white/20" onClick={() => handleOAuthSignIn('facebook')} disabled={isLoading}>
                <FaFacebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              <Button variant="outline" className="bg-background/50 backdrop-blur-sm border-white/20" onClick={() => handleOAuthSignIn('twitter')} disabled={isLoading}>
                <FaTwitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}