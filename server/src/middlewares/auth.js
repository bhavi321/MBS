const jwt = require("jsonwebtoken");
const authentication = async function (req, res, next) {
  let bearerToken = req.header("Authorization");
  if (!bearerToken)
    return res
      .status(400)
      .send({ status: false, message: "bearer token is required" });
  token = bearerToken.replace("Bearer ", "");

  jwt.verify(token, "dummykey", (err, decodedToken) => {
    if (err)
      return res.status(400).send({ status: false, message: "invalid token" });
    else {
      req.decodedToken = decodedToken;
      next();
    }
  });
};

module.exports = { authentication };
