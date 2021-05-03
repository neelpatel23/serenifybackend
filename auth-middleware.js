const jwt = require("jsonwebtoken");
const config = require("./config");

module.exports = () => {
  return (req, res, next) => {
    console.log("Auth Middleware")

    const token = req.headers["authorization"];
    if(!token){
      return res.status(401).send("Access Denied")
    }
    else {
      const tokenBody = token.slice(7);
      jwt.verify(tokenBody, config.JWT_SECRET, (err, decoded) => {
        if(err) {
          console.log(`JWT Error; ${err}`);
          return res.status(401).send("Access Denied")
        }
        next()
      });
    }
  };
};