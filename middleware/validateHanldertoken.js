const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { constants } = require("../constants");
const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
      if (err) {
        res.status(constants.UNAUTHORIZED).json({
          data: null,
          message: "Invalid token.",
          error: "Unauthorized",
        });
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(constants.UNAUTHORIZED).json({
        data: null,
        message: "User is not authorized or token is missing.",
        error: "Unauthorized",
      });
    }
  }
});
module.exports = validateToken;
