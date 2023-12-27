const express = require("express");
const { getusers, postForm, Postsignup, signInUser } = require("./controller");

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await getusers();
  console.log(users);
  res.send(users);
});

router.post("/forms", async (req, res) => {
  try {
    const formInfo = req.body;
    console.log("we made it to here", formInfo);

    const response = await postForm(req, res);

    console.log("sent result", response);
  } catch (error) {
    console.error("Error handling form submission:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/signUp", async (req, res) => {
  try {
    const userSignUp = req.body;
    console.log("step 1 signup", userSignUp);

    const response = await Postsignup(req, res);
    console.log("sent result", response);
  } catch (error) {
    console.error("Error handling form submission:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/signIn", async (req, res) => {
  await signInUser(req, res);
});

module.exports = router;
