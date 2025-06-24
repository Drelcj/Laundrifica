// src/app/dashboard/user/settings/actions.ts
'use server'

import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { revalidatePath } from 'next/cache'
import { Database } from '@/types/database'

// This action will be called by our form
export async function updateUserProfile(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: 'Not authenticated' };
  }

  // Get form data
  // Note: We are splitting the full_name back into first_name and last_name for the form,
  // but Supabase only needs the full_name.
  const fullName = `${formData.get('first-name')} ${formData.get('last-name')}`.trim();
  const phoneNumber = formData.get('phone') as string;

  // Prepare data for Supabase update
  const updatedProfile = {
    full_name: fullName,
    phone_number: phoneNumber,
    updated_at: new Date().toISOString(), // Update the timestamp
  };

  const { error } = await supabase
    .from('profiles')
    .update(updatedProfile)
    .eq('id', user.id)

  if (error) {
    console.error('Error updating profile:', error);
    return { success: false, message: `Failed to update profile: ${error.message}` };
  }
  
  // Revalidate the path to ensure the new data is shown immediately.
  // This is especially useful for the SiteHeader which shows the name.
  revalidatePath('/', 'layout');

  return { success: true, message: 'Profile updated successfully!' };
}