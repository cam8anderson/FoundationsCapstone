const bcrypt = require("bcrypt");
const supabase = require("../supabase");

const getusers = async () => {
  const { data, error } = await supabase.supabase.from("users").select();
  return data;
};

module.exports = { getusers };
