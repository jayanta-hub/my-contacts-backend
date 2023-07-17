const mongoose = require("mongoose");
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
module.exports = connectdb;
