const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const routes = require('./routes');
require("dotenv").config();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/public`));

app.set(`view engine`, ejs);
app.set(`views`, __dirname + "/views");

//routes(app);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`)
});

app.post("./signUp",(req,res)=>{
    const email=req.body.email
    res.render("home.ejs",{customer:email})
})
app.post("./contactForm",(req,res)=>{
    const email=req.body.email,name=req.body.name,message=req.body.message
    res.render("home.ejs",{customer:name})
})
 app.get("./",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
 })