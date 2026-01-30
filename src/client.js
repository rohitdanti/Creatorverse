import { createClient } from '@supabase/supabase-js';

const URL = 'https://hpkydxkdmcuticyrbydu.supabase.co';
const API_KEY = 'sb_publishable_pR0Y6iTqnI5WJXfPpKvmVg_G_rcGy-S';

export const supabase = createClient(URL, API_KEY);
