const bcrypt = require("bcrypt");
const supabase = require("./supabase");

const getusers = async () => {
  const { data, error } = await supabase.supabase.from("users").select();
  return data;
};

const postForm = async (req, res) => {
  const { name, email, number, city, Quantity, wax, pickup, dropoff, gcn } =
    req.body;
  console.log(req.body);
  try {
    const { data, error } = await supabase.supabase
      .from("form")
      .insert([
        {
          name: name,
          email: email,
          phone_nums: number,
          city: city,
          quantity: Quantity,
          wax: wax,
          pickup: pickup,
          dropoff: dropoff,
          gcn: gcn,
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting data:", error.message);
    } else {
      console.log("Data inserted successfully:", data);
    }
  } catch (error) {
    console.error("Error", error.message);
  }
};

module.exports = { getusers, postForm };
