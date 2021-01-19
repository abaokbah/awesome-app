const parser =    require('body-parser');
const express =   require('express');
const mongoose =  require('mongoose');

const postRoutes = require('./routes/posts');

const app = express();

mongoose.connect("mongodb+srv://abaokbah:KZ1lfKETzCYB6c5V@cluster0.s92vf.mongodb.net/test?retryWrites=true&w=majority")

app.use(parser.json());
// app.use(parser.urlencoded());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);
// KZ1lfKETzCYB6c5V

module.exports = app;





// const posts = [
//   {
//     id: "fadf12421l",
//     title: "First server-side post",
//     content: "This is coming from the server"
//   },
//   {
//     id: "ksajflaj132",
//     title: "Second server-side post",
//     content: "This is coming from the server!"
//   }
// ];
