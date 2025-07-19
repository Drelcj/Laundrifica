// src/lib/actions/delivery_agents.ts
'use server';

import { createClient } from '@/utils/supabase/server';

export async function getDeliveryAgents() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name')
    .eq('role', 'delivery_agent');

  if (error) {
    console.error('Error fetching delivery agents:', error);
    return [];
  }

  return data;
}
