const express = require("express");
const mainRoute = express.Router();
mainRoute.use("/users/contacts", require("./contactsRoutes"));
mainRoute.use("/authenticate", require("./userRoutes"));
module.exports = mainRoute;
