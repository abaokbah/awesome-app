const Post    = require('../model/post');
const express = require("express");
const checkAuth = require("../Middleware/check-auth")


const router  = express.Router();


// KZ1lfKETzCYB6c5V
router.post("", checkAuth,
(req, res, next) => {
  const post = new Post(
    {
      title: req.body.title,
      content: req.body.content
    }
  );
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost.id
    });
  });
});

router.put("/:id", checkAuth,
(req, res, next) => {
  const post = new Post ({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  })
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({
      message: "Updated successfully"
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found.'});
    }
  })
})

router.delete("/:id", checkAuth,
(req, res, next) => {
  // console.log(req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({
      message: "Post deleted successfully"});
  });
});

module.exports = router;
