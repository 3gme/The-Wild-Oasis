import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabaseUrl = "https://rnjrezmnuhtueoqrpdvl.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuanJlem1udWh0dWVvcXJwZHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NTU3MjQsImV4cCI6MjA4ODIzMTcyNH0._c4EV5yfpdAgO4cGbBx9uZuPQiq5227VPAFgKGhblxo";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
