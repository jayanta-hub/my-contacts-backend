const express = require("express");
const router = express.Router();
const {
  getContact,
  createContact,
  updateContact,
  indivisualContact,
  deleteContact,
} = require("../controller/contactController");
const validateToken = require("../middleware/validateHanldertoken");
router.use(validateToken);
router.route("/").get(getContact).post(createContact);

router
  .route("/:id")
  .get(indivisualContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
