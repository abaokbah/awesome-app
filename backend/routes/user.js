const express = require("express");
const bc      = require("bcrypt");
const User    = require("../model/user")
const jwt     = require("jsonwebtoken")


const router = express.Router();

router.post("/signup", (req, res, next) => {
  bc.hash(req.body.password, 10)
    .then(hash => {
      const user = new User(
        {
          username: req.body.username,
          email: req.body.email,
          password: hash
        });
        user.save().then(createdUser => {
          res.status(201).json({
            message: 'New user created successfully',
            result: createdUser
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        })
    });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({email: req.body.email})
  .then(user => {
    console.log(user);
    if(!user) {
        return res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser = user;
    return bc.compare(req.body.password, user.password);
  })
  .then(result => {
    console.log(result)
    if(!result){
        return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      "all_the_world_is_a_stage_and_all_the_men_and_women_are_merely_players",
      {expiresIn: '1h'}
    );
    console.log(token)
    res.status(200).json({
      message: "Login success!",
      token: token
    })
  })
  .catch(err => {
    return res.status(401).json({
      message: "Auth failed"
    });
  })
});

module.exports = router;
