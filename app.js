//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const homeStartingContent = " ";
const aboutContent = "We are a team of dedicated professionals who are passionate about providing high-quality services to our clients. Our mission is to help our clients achieve their goals and succeed in their respective industries.";
const contactContent = "If you're interested in learning more about our services or would like to discuss your project with us, please don't hesitate to contact us. We look forward to hearing from you and helping you achieve your goals.";
// let posts=[];//global variable
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.connect('mongodb+srv://new-user:08cgt7hNen0eX2Rz@todo.388n0tg.mongodb.net/Blog-Site?retryWrites=true&w=majority');
  
  const blogsSchema = new mongoose.Schema({
    title: String,
    post:String
  });

  const Blog = mongoose.model('Blog', blogsSchema);
  


app.get("/",function (req,res) {  
  Blog.find({}).then(function (items) {
    res.render("home", {startingContent:homeStartingContent,posts:items});
    });
//  res.render("home",{startingContent:homeStartingContent,posts:posts});
  
});



app.get("/about",function (req,res) {
  res.render("about",{aboutContent:aboutContent});
});



app.get("/contact",function (req,res) {
  res.render("contact",{contactContent:contactContent});
});


app.get("/compose",function (req,res) {

  res.render("compose");
});

app.post("/compose",function (req,res) {

  Blog.insertMany({title:req.body.postTitle,post:req.body.postBody});

  res.redirect("/");

});


app.get("/posts/:postName",function (req,res) {
//  let requestedTitle=_.lowerCase(req.params.postName);
   let requestedTitle=req.params.postName;

 Blog.find({title:requestedTitle}).then(function (oldBlog) {
//    console.log("Match found");console.log(oldBlog[0].toObject().title);
   
    res.render("post",{title:requestedTitle,content:oldBlog[0].toObject().post});  
  });  
});





app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
