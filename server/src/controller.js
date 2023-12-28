const bcrypt = require("bcrypt");
const fetch = require("node-fetch");
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
  const { user, error } = await supabase.supabase.auth.signUp({
    email: signEmail,
    password: signPass,
  });
  console.log(error);
};

const signInUser = async (req, res) => {
  const { signEmail, signPass } = req.body;

  const { user, error } = await supabase.supabase.auth.signInWithPassword({
    email: signEmail,
    password: signPass,
  });
  console.log(error);
  if (supabase.supabase.auth.getSession()) {
    console.log("logged in");
  }
  res.json({ redirect: "http://localhost:8080/" });
};

const yelpApi = async (req, res) => {
  const APIKEY = process.env.YELP_API_KEY;
  const apiUrl = `https://api.yelp.com/v3/businesses/yBNqJRQEOPSpwhiybMQ29A/reviews`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${APIKEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getusers, postForm, Postsignup, signInUser, yelpApi };
