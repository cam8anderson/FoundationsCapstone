const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const supabase = require("./supabase");

const getusers = async () => {
  const { data, error } = await supabase.supabase
    .from("users")
    .select("username");
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

    const { userData, userError } = await supabase.supabase
      .from("users")
      .select("email")
      .eq("email", signEmail);

    console.log(userData);

    if (userData) {
      return res.status(409).json({ error: "person already exists" });
    }
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
    return res.status(500).json({ error: "Internal server error" });
  }
};

const signInUser = async (req, res) => {
  res.cookie("test", "test");

  const { signEmail, signPass } = req.body;

  const { data, userError } = await supabase.supabase
    .from("users")
    .select("*")
    .eq("email", signEmail);

  console.log(data);
  if (!data) {
    return res.status(401).json({ error: "sign in is incorrect" });
  }

  console.log(signPass);
  const passwordCorrect = await bcrypt.compare(signPass, data[0]?.passwordhash);

  if (!passwordCorrect) {
    return res.status(401).json({ error: "sign in is busting" });
  }

  const token = jwt.sign({ userId: data[0]?.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("powderprep-session", token, {
    maxAge: 900000,
    httpOnly: true,
    sameSite: "none", // required for cross-domain requests
    secure: true, // required for cross-domain requests
    domain: "http://localhost:8080/", // replace with your domain
  });
};

module.exports = { getusers, postForm, Postsignup, signInUser };
