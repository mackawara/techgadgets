const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
//const routes = require('./routes');
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.set(`view engine`, ejs);
app.set(`views`, __dirname + "/views");

//routes(app);

const PORT = process.env.PORT || 3000;

const {signUpRules,contactFormRules,validateForm}=require("./middleware/validation")

app.post("/signUp",signUpRules,validateForm, (req, res) => {
  console.log("signUp pinged");
  const email = req.body.email;

  console.log(email);
  res.render("home.ejs", { customer: email });
});
app.post("./contactForm",contactFormRules,validateForm, (req, res) => {
  const email = req.body.email,
    name = req.body.name,
    message = req.body.message;
  res.render("home.ejs", { customer: name });
});
app.get("/", (req, res) => {
  console.log("pinged");
  res.sendFile(__dirname + "/generic.html");
});
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
