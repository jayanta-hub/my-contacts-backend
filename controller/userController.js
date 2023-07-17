const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { constants } = require("../constants");

//@desc register New User
//@route POST /api/v1/authenticate/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;
  const UserNameAvailble = await userModel.findOne({ name });
  const UserEmailAvailble = await userModel.findOne({ email });

  if (!name || !email || !phone || !password) {
    if (!name) {
      res.status(constants.VALIDATION_ERROR).json({
        data: null,
        message: "name field required.",
        error: "Internal Server Error",
      });
    } else if (!email) {
      res.status(constants.VALIDATION_ERROR).json({
        data: null,
        message: "email field required.",
        error: "Internal Server Error",
      });
    } else if (!phone) {
      res.status(constants.VALIDATION_ERROR).json({
        data: null,
        message: "phone field required.",
        error: "Internal Server Error",
      });
    } else if (!password) {
      res.status(constants.VALIDATION_ERROR).json({
        data: null,
        message: "password field required.",
        error: "Internal Server Error",
      });
    } else {
      res.status(constants.VALIDATION_ERROR).json({
        data: null,
        message: "All field required.",
        error: "Bad request.",
      });
    }
  } else if (UserNameAvailble && UserEmailAvailble) {
    res.status(constants.INTERNAL_SERVER).json({
      data: null,
      message: "User already registered.",
      error: "Internal Server Error",
    });
  } else if (UserEmailAvailble) {
    res.status(constants.INTERNAL_SERVER).json({
      data: null,
      message: "Email is already existing.",
      error: "Internal Server Error",
    });
  } else if (UserNameAvailble) {
    res.status(constants.INTERNAL_SERVER).json({
      data: null,
      message: "UserName is already existing.",
      error: "Internal Server Error",
    });
  } else {
    const hashPassword = await bcrypt.hash(password, 10);
    const contact = await userModel.create({
      name,
      email,
      phone,
      password: hashPassword,
    });

    let resData = [contact].map((item) => {
      return {
        name: item.name,
        email: item.email,
        phone: item.phone,
        _id: item._id,
        __v: item.__v,
      };
    });
    if (contact) {
      res.status(constants.CREATED).json({
        data: resData,
        message: "Registration successfully.",
        error: null,
      });
    } else {
      res.status(constants.VALIDATION_ERROR).json({
        data: null,
        message: "User Data not valid.",
        error: "bad request",
      });
    }
  }
});

//@desc Login User
//@route POST /api/v1/authenticate/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const element = await userModel.findOne({ email: email });
  if (element && (await bcrypt.compare(password, element?.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: element.name,
          email: element.email,
          id: element.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRETE,
      { expiresIn: "10m" },
    );
    const response = [
      {
        id: element.id,
        name: element.name,
        email: element.email,
        accessToken: accessToken,
      },
    ];
    return res.status(constants.SUCCESS).json({
      data: response,
      message: "Login success.",
      error: null,
    });
  } else if (element?.email !== email) {
    res.status(constants.NOT_FOUNT).json({
      data: null,
      message: "User does not exist.",
      error: "Not Found",
    });
  } else if (!(await bcrypt.compare(password, element?.password))) {
    res.status(constants.NOT_FOUNT).json({
      data: null,
      message: "Invalid password.",
      error: "Not Found",
    });
  } else {
    res.status(constants.NOT_FOUNT).json({
      data: null,
      message: "User not found.",
      error: "Not Found",
    });
  }
});

//@desc Current User
//@route GET /api/v1/authenticate/current
//@access private

const currentUser = asyncHandler(async (req, res) => {
  res.status(constants.SUCCESS).json({
    data: req.user,
    message: "Current User information fetch success.",
    error: null,
  });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
