const Post =      require('./model/post');
const parser =    require('body-parser');
const express =   require('express');
const mongoose =  require('mongoose');

//
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
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
});

// KZ1lfKETzCYB6c5V
app.post("/api/posts", (req, res, next) => {
  const post = new Post(
    {
      title: req.body.title,
      content: req.body.content
    }
  );
  post.save(post).then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost.id
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted successfully"});
  });
});

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
