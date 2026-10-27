const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    console.log("Hdrs: ", req.headers)

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        msg: "authentication token required!",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        msg: "authentication token required!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticate
