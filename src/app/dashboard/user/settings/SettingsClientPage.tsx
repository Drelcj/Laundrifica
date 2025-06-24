// src/app/dashboard/user/settings/SettingsClientPage.tsx
"use client"

import { useState, useEffect, useTransition } from "react"
import { Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { Profile } from "@/types/app" // Import our Profile type
import { updateUserProfile } from "./actions" // Import our Server Action

// Animation variants (unchanged)
const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring" as "spring", stiffness: 100 } } };

type SettingsClientPageProps = {
  profile: Profile | null;
};

export default function SettingsClientPage({ profile }: SettingsClientPageProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  // Initialize state with the profile data passed from the server
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState(profile?.phone_number || '');
  
  // Split the full_name from the profile into first and last names for the form
  useEffect(() => {
    if (profile?.full_name) {
      const nameParts = profile.full_name.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
    }
  }, [profile]);

  const handleProfileUpdate = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateUserProfile(formData);
      toast({
        title: result.success ? "Success" : "Error",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      });
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header (unchanged) */}
      <motion.div className="flex flex-col gap-2" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </motion.div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications" disabled>Notifications</TabsTrigger>
          <TabsTrigger value="privacy" disabled>Privacy</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            {/* The form now calls our server action */}
            <form action={handleProfileUpdate}>
              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details. Email cannot be changed here.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Avatar logic can be added here later */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        {/* Use controlled components with value and onChange */}
                        <Input id="first-name" name="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" name="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        {/* Email is read-only for security */}
                        <Input id="email" type="email" value={profile?.id ? (profile.id.includes('@') ? profile.id : '') : ''} disabled />

                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" disabled={isPending}>
                      {isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </form>
            {/* Other cards like "Preferences" can be added here */}
          </motion.div>
        </TabsContent>
        {/* Other TabsContent sections remain */}
        <TabsContent value="security">
           <p>Security settings coming soon.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}