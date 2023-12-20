const { createClient } = require("@supabase/supabase-js");

require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_PROJECT_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };
