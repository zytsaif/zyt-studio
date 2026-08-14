import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_SQL_SCHEMA = `-- COPY & RUN THIS IN YOUR SUPABASE SQL EDITOR TO CREATE THE REALTIME TICKETS TABLE

CREATE TABLE IF NOT EXISTS public.plugin_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_id TEXT UNIQUE NOT NULL,
  owner_id TEXT NOT NULL,
  client_name TEXT NOT NULL,
  discord TEXT NOT NULL,
  email TEXT NOT NULL,
  server_name TEXT DEFAULT 'N/A',
  currency TEXT DEFAULT 'INR',
  budget_min TEXT DEFAULT '0',
  budget_max TEXT DEFAULT '0',
  budget_formatted TEXT DEFAULT '₹0',
  deadline TEXT DEFAULT 'Within 1 Week',
  plugin_description TEXT NOT NULL,
  status TEXT DEFAULT 'Pending',
  progress_notes JSONB DEFAULT '[]'::jsonb,
  messages JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Allow public read/write access
ALTER TABLE public.plugin_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read plugin_requests"
  ON public.plugin_requests FOR SELECT USING (true);

CREATE POLICY "Allow public insert plugin_requests"
  ON public.plugin_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update plugin_requests"
  ON public.plugin_requests FOR UPDATE USING (true);

CREATE POLICY "Allow public delete plugin_requests"
  ON public.plugin_requests FOR DELETE USING (true);

-- Enable Realtime for plugin_requests table
ALTER PUBLICATION supabase_realtime ADD TABLE public.plugin_requests;
`;

let cachedClient: SupabaseClient | null = null;
let currentUrl: string = '';
let currentKey: string = '';

export function getSupabaseClient(url?: string, anonKey?: string): SupabaseClient | null {
  const targetUrl = url || import.meta.env.VITE_SUPABASE_URL || localStorage.getItem('zyt_supabase_url') || '';
  const targetKey = anonKey || import.meta.env.VITE_SUPABASE_ANON_KEY || localStorage.getItem('zyt_supabase_key') || '';

  if (!targetUrl || !targetKey) {
    return null;
  }

  if (cachedClient && currentUrl === targetUrl && currentKey === targetKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(targetUrl, targetKey);
    currentUrl = targetUrl;
    currentKey = targetKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}
