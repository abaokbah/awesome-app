const mongoose = require("mongoose");
const mongooseValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: {type: String},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}

});

// 3rd party mongo plugin that allows us to validate input
// at a DB level
userSchema.plugin(mongooseValidator);

module.exports = mongoose.model("User", userSchema);
