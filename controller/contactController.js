const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Contact = require("../models/contactModel");
const userModel = require("../models/userModel");
const { constants } = require("../constants");

//@desc Get all contacts
//@route GET /api/v1/users/contacts
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contacts = await userModel.find();
  res.status(constants.SUCCESS).json({
    data: contacts,
    message: "Data fetch successfully.",
    error: null,
  });
});

//@desc Create New contacts
//@route POST /api/v1/users/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  const contacts = await userModel.find();
  const isContactAvailable = userModel.map((element) => {
    if (element.name === name && element.email === email) {
      return true;
    } else {
      return false;
    }
  });
  if (!name || !email || !phone) {
    if (!name) {
      res.status(constants.VALIDATION_ERROR).json({
        data: null,
        message: "name field required.",
        error: "Bad request.",
      });
    }
    if (!email) {
      res.status(constants.VALIDATION_ERROR).json({
        data: null,
        message: "name field required.",
        error: "Bad request.",
      });
    }
    if (!phone) {
      res.status(constants.VALIDATION_ERROR).json({
        data: null,
        message: "name field required.",
        error: "Bad request.",
      });
    }
    res.status(constants.VALIDATION_ERROR).json({
      data: null,
      message: "All field required.",
      error: "Bad request.",
    });
  }
  if (isContactAvailable.includes(true)) {
    res.status(constants.INTERNAL_SERVER).json({
      data: null,
      message: "User is already existing.",
      error: "Internal Server Error",
    });
  } else {
    const contact = await userModel.create({
      name,
      email,
      phone,
    });

    res.status(constants.CREATED).json({
      data: [contact],
      message: "Contact created successfully.",
      error: null,
    });
  }
});

//@desc Get Indivisual contacts
//@route GET /api/v1/users/contacts/:id
//@access public

const indivisualContact = asyncHandler(async (req, res) => {
  const contacts = await userModel.findById(req.params.id);

  if (!contacts) {
    res.status(constants.NOT_FOUNT).json({
      data: null,
      message: "Contact not found.",
      error: "Not Found",
    });
  }
  const response = {
    _id: contacts._id,
    name: contacts.name,
    email: contacts.email,
    phone: contacts.phone,
    createdAt: contacts.createdAt,
    updatedAt: contacts.updatedAt,
    __v: contacts.__v,
  };
  res.status(constants.SUCCESS).json({
    data: [response],
    message: "Data fetch successfully.",
    error: null,
  });
});

//@desc Update contacts
//@route PUT /api/v1/users/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contacts = await userModel.findById(req.params.id);
  if (!contacts) {
    res.status(constants.NOT_FOUNT).json({
      data: null,
      message: "Contact not found.",
      error: "Not Found",
    });
  }
  const updateContact = await userModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );
  const response = {
    _id: updateContact._id,
    name: updateContact.name,
    email: updateContact.email,
    phone: updateContact.phone,
    createdAt: updateContact.createdAt,
    updatedAt: updateContact.updatedAt,
    __v: updateContact.__v,
  };
  res.status(constants.SUCCESS).json({
    data: [response],
    message: "Update successfully.",
    error: null,
  });
});

//@desc delete contacts
//@route DELETE /api/v1/users/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const contacts = await userModel.findById(req.params.id);
  if (!contacts) {
    res.status(constants.NOT_FOUNT).json({
      data: null,
      message: "Contact not found.",
      error: "Not Found",
    });
  }
  await contacts.deleteOne({
    _id: new mongoose.ObjectId(req.params.id),
  });
  res.status(constants.SUCCESS).json({
    data: null,
    message: "Data delete Successfully",
    error: null,
  });
});
module.exports = {
  getContact,
  createContact,
  updateContact,
  indivisualContact,
  deleteContact,
};
