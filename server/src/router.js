const express = require("express");
const { getusers } = require("./controller");

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await getusers();
  console.log(users);
  res.send(users);
});

module.exports = router;
