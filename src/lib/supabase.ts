"use client";
import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default supabase;
