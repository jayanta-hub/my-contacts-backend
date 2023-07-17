const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact username"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
      unique: [
        true,
        "Email address already existing, please try with another Email address.",
      ],
    },
    password: {
      type: String,

      required: [true, "Please add the user password"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("User", userSchema);
