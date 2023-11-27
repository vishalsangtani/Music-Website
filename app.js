const express=require("express");
const bodyParser=require("body-parser")
const request=require("request");
const https=require("https");
const mongoose=require("mongoose");
const session = require('express-session');
const path = require('path');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
  secret: 'vishal',
  resave: false,
  saveUninitialized: false
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/indexLandingPage.html");
});
app.get("/home",function(req,res){
  const username = req.session.username;
  res.render("indexHomePage", { username: username });
});
app.get("/signup",function(req,res){
    res.sendFile(__dirname+"/indexSignup.html");
});
app.get("/signup/success",function(req,res){
  res.sendFile(__dirname+"/indexSuccessSignup.html");
});
app.get("/login",function(req,res){
    res.sendFile(__dirname+"/indexLogin.html");
});
app.get("/login/incorrectPassword",function(req,res){
  res.sendFile(__dirname+"/password_fail.html");
});
app.get("/login/noUser",function(req,res){
  res.sendFile(__dirname+"/user_fail.html");
});
app.get("/home/topHits", function(req,res){
  const username = req.session.username;
  res.render("indexHits", { username: username });
});
app.get("/home/topHits/top50Global",function(req,res){
  const username = req.session.username;
  res.render("indexTop_50_Global", { username: username });
});
app.get("/home/topHits/top50India",function(req,res){
  const username = req.session.username;
  res.render("indexTop_50_India", { username: username });
});
app.get("/home/topHits/hindi",function(req,res){
  const username = req.session.username;
  res.render("indexHindi", { username: username });
});
app.get("/home/topHits/english",function(req,res){
  const username = req.session.username;
  res.render("indexEnglish", { username: username });
});
app.get("/home/topHits/punjabi",function(req,res){
  const username = req.session.username;
  res.render("indexPunjabi", { username: username });
});
app.get("/home/topHits/hits",function(req,res){
  const username = req.session.username;
  res.render("indexTop_Hits", { username: username });
});
app.get("/home/artists", function(req,res){
  const username = req.session.username;
  res.render("indexArtist", { username: username });
});
app.get("/home/artists/apDhillon",function(req,res){
  const username = req.session.username;
  res.render("indexAP", { username: username });
});
app.get("/home/artists/arijitSingh",function(req,res){
  const username = req.session.username;
  res.render("indexArijitSingh", { username: username });
});
app.get("/home/artists/diljitDosanjh",function(req,res){
  const username = req.session.username;
  res.render("indexDiljitDosanjh", { username: username });
});
app.get("/home/artists/duaLipa",function(req,res){
  const username = req.session.username;
  res.render("indexDuaLipa", { username: username });
});
app.get("/home/artists/pritam",function(req,res){
  const username = req.session.username;
  res.render("indexPritam", { username: username });
});
app.get("/home/artists/shreyaGhoshal",function(req,res){
  const username = req.session.username;
  res.render("indexShreyaGhoshal", { username: username });
});
app.get("/home/artists/sidhuMoosewala",function(req,res){
  const username = req.session.username;
  res.render("indexSidhuMoosewala", { username: username });
});
app.get("/home/artists/taylorSwift",function(req,res){
  const username = req.session.username;
  res.render("indexTaylorSwift", { username: username });
});
app.get("/home/artists/weeknd",function(req,res){
  const username = req.session.username;
  res.render("indexWeeknd", { username: username });
});
app.get("/home/mood", function(req,res){
  const username = req.session.username;
  res.render("indexMood", { username: username });
});
app.get("/home/mood/drive", function(req,res){
  const username = req.session.username;
  res.render("indexDrive", { username: username });
});
app.get("/home/mood/gym", function(req,res){
  const username = req.session.username;
  res.render("indexGym", { username: username });
});
app.get("/home/mood/happy", function(req,res){
  const username = req.session.username;
  res.render("indexHappy", { username: username });
});
app.get("/home/mood/good", function(req,res){
  const username = req.session.username;
  res.render("indexGood", { username: username });
});
app.get("/home/mood/sleep", function(req,res){
  const username = req.session.username;
  res.render("indexSleep", { username: username });
});
app.get("/home/mood/study", function(req,res){
  const username = req.session.username;
  res.render("indexStudy", { username: username });
});
mongoose.connect('mongodb://127.0.0.1:27017/logIn', { useNewUrlParser: true, useUnifiedTopology: true });
const signupSchema=new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    pass: String
});
const detail=mongoose.model("detail",signupSchema);
app.post("/signup",function(req,res){
    var info=new detail(req.body);
    info.save();
    res.redirect("/signup/success"); 
});

app.post("/login", function(req, res) {
    const email = req.body.email;
    const password = req.body.pass;
  
    detail.findOne({ email: email })
      .exec()
      .then(function(foundUser) {
        if (foundUser) {
          if (foundUser.pass === password) {
            req.session.username = foundUser.fName;
            res.redirect("/home");
          } else {
            res.redirect("/login/incorrectPassword");
          }
        } else {
          res.redirect("/login/noUser");
        }
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).send("An error occurred. Please try again later.");
      });
});
app.post("/login/incorrectPassword",function(req,res){
  res.redirect("/login");
});
app.post("/login/noUser",function(req,res){
  res.redirect("/login");
});

app.listen(4000,function(){
    console.log("Server started at port 4000.");
});