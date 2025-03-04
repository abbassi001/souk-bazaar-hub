
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eaxpkyxlykbvhcxekcae.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVheHBreXhseWtidmhjeGVrY2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5Mzk2NTQsImV4cCI6MjA1NjUxNTY1NH0.bGpNUSF4XP2xv8itpy7zu6RDtHIlOnfeamwkaMs9s_4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
