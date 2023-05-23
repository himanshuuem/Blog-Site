//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const homeStartingContent = " ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
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
 let requestedTitle=_.lowerCase(req.params.postName);
 Blog.find({title:requestedTitle}).then(function (oldBlog) {
   console.log("Match found");console.log(oldBlog[0].toObject().title);
    res.render("post",{title:oldBlog[0].toObject().title,content:oldBlog[0].toObject().post});  
  });  
});





app.listen(process.env.PORT||3000, function() {
  console.log("Server started on port 3000");
});
