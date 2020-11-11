const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true}
})

// The top part is the blueprint, now we need to create
// a model of it. Additionally, we exprot it so it's available
// to other objects
module.exports = mongoose.model("Post", postSchema);
