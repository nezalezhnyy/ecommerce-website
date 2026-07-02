import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.WITE_SUPABASE_URL;
const supabaseKey = import.meta.env.WITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);