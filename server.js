const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectdb = require("./config/dbConnection");
const mainRoute = require("./routes");
require("dotenv").config();
connectdb();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/v1", mainRoute);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
