// ENV vars
require("dotenv").config();

// Import dependencies
const express = require("express");
const router = require("./routes");

// Create an app
const app = express();
app.use(express.json());

// Configure app
app.use(express.static(__dirname + "/public"));

app.use(router);

// Start app
app.listen(process.env.PORT);
