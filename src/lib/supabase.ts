import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_SQL_SCHEMA = `-- COPY & RUN THIS IN YOUR SUPABASE SQL EDITOR TO CREATE ALL 3 TABLES WITH REALTIME ENABLED

-- 1. PLUGIN REQUESTS TABLE
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

-- 2. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  discord TEXT,
  rating INTEGER DEFAULT 5,
  quote TEXT NOT NULL,
  role TEXT DEFAULT 'Community Member',
  server_name TEXT DEFAULT 'Minecraft Server',
  avatar TEXT,
  verified_order TEXT DEFAULT 'Custom Plugin Order',
  date TEXT DEFAULT 'Just Now',
  status TEXT DEFAULT 'approved',
  pinned BOOLEAN DEFAULT false,
  hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TICKET MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.ticket_messages (
  id TEXT PRIMARY KEY,
  request_id TEXT NOT NULL,
  ticket_id TEXT NOT NULL,
  sender TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  text TEXT NOT NULL,
  timestamp TEXT DEFAULT 'Just Now',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS) & Allow public read/write access
ALTER TABLE public.plugin_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read plugin_requests" ON public.plugin_requests FOR SELECT USING (true);
CREATE POLICY "Allow public insert plugin_requests" ON public.plugin_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update plugin_requests" ON public.plugin_requests FOR UPDATE USING (true);
CREATE POLICY "Allow public delete plugin_requests" ON public.plugin_requests FOR DELETE USING (true);

CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update reviews" ON public.reviews FOR UPDATE USING (true);
CREATE POLICY "Allow public delete reviews" ON public.reviews FOR DELETE USING (true);

CREATE POLICY "Allow public read ticket_messages" ON public.ticket_messages FOR SELECT USING (true);
CREATE POLICY "Allow public insert ticket_messages" ON public.ticket_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update ticket_messages" ON public.ticket_messages FOR UPDATE USING (true);
CREATE POLICY "Allow public delete ticket_messages" ON public.ticket_messages FOR DELETE USING (true);

-- Enable Realtime for all 3 tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.plugin_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ticket_messages;
`;

let cachedClient: SupabaseClient | null = null;
let currentUrl: string = '';
let currentKey: string = '';

export const DEFAULT_SUPABASE_URL = 'https://evchanhatbvrlsxtplhv.supabase.co';

export function getSupabaseClient(url?: string, anonKey?: string): SupabaseClient | null {
  const targetUrl =
    url ||
    import.meta.env.VITE_SUPABASE_URL ||
    localStorage.getItem('zyt_supabase_url') ||
    DEFAULT_SUPABASE_URL;

  const targetKey =
    anonKey ||
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    localStorage.getItem('zyt_supabase_key') ||
    '';

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
