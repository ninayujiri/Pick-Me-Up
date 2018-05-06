"use strict";

require('dotenv').config();

const PORT           = process.env.PORT || 8080;
const ENV            = process.env.ENV || "development";
const express        = require("express");
const bodyParser     = require("body-parser");
const sass           = require("node-sass-middleware");
const methodOverride = require("method-override");
const app            = express();

const knexConfig = require("./knexfile");
const knex       = require("knex")(knexConfig[ENV]);
const morgan     = require('morgan');
const knexLogger = require('knex-logger');

const twilioInfo       = require("./apiData/twilioInfo.js")
const twilio           = require('twilio');
const twilioAccountSid = twilioInfo.twilioID;
const twilioToken      = twilioInfo.twilioToken;
const twilioClient     = new twilio(twilioAccountSid,twilioToken);
const smsFunctions     = require("./twilioFunctions/twilioFunctions.js")(twilioClient);


// Seperated Routes for each Resource
const accountRoutes = require("./routes/accounts")(knex);
const restoRoutes   = require("./routes/restaurant")(knex, smsFunctions);
const ordersRoutes  = require("./routes/orders")(knex, smsFunctions);
const dishesRoutes  = require("./routes/dishes")(knex);
const smsRoutes        = require("./routes/sms.js")(twilio, smsFunctions);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

// Mount all resource routes
// app.use("/api/users", usersRoutes);
app.use("/restaurants", restoRoutes);
app.use("/dishes", dishesRoutes);
app.use("/orders", ordersRoutes);
app.use("/sms", smsRoutes);

// Home page
app.get("/", (req, res) => {
  res.render("index");
});


// Add new item page for restaurants
app.get("/dishes_new", (req, res) => {
  res.render("dishes_new");
});


// Confirmation Page
app.get("/confirmation", (req, res) => {
  res.render("confirmation");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
