const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router");

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(4004, () => console.log(`running on 4004`));
