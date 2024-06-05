const jwt = require("jsonwebtoken");
function PublisherJWTMiddleware(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    let token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).send({ error: "No token" });
    }
    const data = jwt.verify(token, process.env.JWT_KEY);
    if (data.type != "publisher") {
      res.status(403).send({ error: "Forbidden" });
    }
    req.publisher = data;
    next();
  } else {
    res.status(401).send("Invalid token");
  }
}

module.exports = { PublisherJWTMiddleware };
