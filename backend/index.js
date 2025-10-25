require("dotenv").config();
require('module-alias/register');
const express = require("express");
const favicon = require("serve-favicon");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const googleAuthRouter = require("./routers/googleAuth.js");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({}));

// --------- routers ---------

app.use("/auth", googleAuthRouter);

// --------- page ---------

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

app.listen(PORT, () => {
  console.log(`Video server running at http://localhost:${PORT}`);
});
