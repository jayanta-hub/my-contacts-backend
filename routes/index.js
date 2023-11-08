const express = require("express");
const mainRoute = express.Router();
mainRoute.use("/users/contacts", require("./contactsRoutes"));
mainRoute.use("/authenticate", require("./userRoutes"));
mainRoute.use("/user", require("./ProfileRoutes"));
module.exports = mainRoute;
