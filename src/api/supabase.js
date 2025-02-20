import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://dxvkmznqgysyniwcbelc.supabase.co"; 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dmttem5xZ3lzeW5pd2NiZWxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNTcxMTksImV4cCI6MjA1MzczMzExOX0.dzD-V0sDwg4QTiGPHa7bxA0D3LZet4DPMM7YodJP2Uk"; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);