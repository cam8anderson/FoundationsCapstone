const bcrypt = require("bcrypt");
const saltRounds = 10;

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

const Postsignup = async (req, res) => {
  const { signName, signEmail, signPass } = req.body;
  console.log(req.body);

  try {
    const hashedSignPass = await bcrypt.hash(signPass, saltRounds);

    try {
      const { data, error } = await supabase.supabase
        .from("users")
        .insert([
          {
            username: signName,
            email: signEmail,
            passwordhash: hashedSignPass,
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
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getusers, postForm, Postsignup };
