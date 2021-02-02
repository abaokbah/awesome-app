const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // get the value after "bearer"
    jwt.verify(token, "all_the_world_is_a_stage_and_all_the_men_and_women_are_merely_players")
    next();
  } catch(error) {
      res.status(401).json( { message: "Auth failed!"} );
  }
};
