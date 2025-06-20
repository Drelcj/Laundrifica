// src/app/signup/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { Eye, EyeOff, CheckCircle2, Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [membershipType, setMembershipType] = useState('standard');

  // UI feedback state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // --- HANDLER for Email/Password Signup ---
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    // This 'data' object is crucial. We pass the full_name here,
    // and our SQL trigger `handle_new_user` will pick it up and
    // populate the 'full_name' column in our 'profiles' table.
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${firstName} ${lastName}`,
          // You can pass other metadata here if needed
        },
      },
    });

    setIsLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // By default, Supabase requires email confirmation.
    // We check if the user object is created but there's no session yet.
    if (data.user && !data.session) {
      setSuccessMessage('Success! Please check your email to confirm your account and sign in.');
    }
  };
  
  // The social sign-in handler can be reused here as well
  const handleOAuthSignIn = async (provider: 'google' | 'facebook' | 'twitter') => {
    setIsLoading(true);
    setError(null);
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

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
              <h2 className="text-3xl font-bold gradient-text">Laundrifica</h2>
            </Link>
          </motion.div>
          <motion.h2 className="mt-6 text-3xl font-extrabold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            Create your account
          </motion.h2>
          <motion.p className="mt-2 text-sm text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
          </motion.p>
        </div>

        <motion.div
          className="glass-card p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* We will hide the form on success and only show the success message */}
          {!successMessage ? (
            <form onSubmit={handleSignUp} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="bg-background/50 backdrop-blur-sm border-white/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="bg-background/50 backdrop-blur-sm border-white/20" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-background/50 backdrop-blur-sm border-white/20" />
              </div>
              
              <div className="space-y-2">
                 <Label htmlFor="phone">Phone Number</Label>
                 <Input id="phone" type="tel" placeholder="+234 800 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-background/50 backdrop-blur-sm border-white/20" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-background/50 backdrop-blur-sm border-white/20" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Password must be at least 6 characters long.
                </p>
              </div>
              
              {/* Note: Membership Type logic will be handled post-signup for now */}
              {/* We can add a column to the profiles table for this later */}

              {error && (
                <p className="text-sm text-red-500 bg-red-500/10 p-2 rounded-md border border-red-500/30">{error}</p>
              )}

              <Button type="submit" className="w-full gradient-border overflow-hidden group" disabled={isLoading}>
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center justify-center">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Account
                </span>
              </Button>
            </form>
          ) : (
            <div className="text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                <h3 className="mt-2 text-lg font-medium">Success!</h3>
                <p className="mt-2 text-sm text-muted-foreground">{successMessage}</p>
                <Button asChild className="mt-4">
                    <Link href="/login">Proceed to Sign In</Link>
                </Button>
            </div>
          )}
          {/* Social login buttons will be added here later */}
        </motion.div>
      </motion.div>
    </div>
  );
}