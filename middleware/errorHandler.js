const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  console.log(
    "🚀 ~ file: errorHandler.js:5 ~ errorHandler ~ statusCode:",
    statusCode,
  );
  console.log(
    "🚀 ~ file: errorHandler.js:5 ~ errorHandler ~  err.message:",
    err.message,
  );
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        statu: constants.VALIDATION_ERROR,
        message: err.message,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({ statu: constants.UNAUTHORIZED, message: err.message });
      break;
    case constants.FORBIDDEN:
      res.json({ statu: constants.FORBIDDEN, message: err.message });
      break;
    case constants.NOT_FOUNT:
      res.json({ statu: constants.NOT_FOUNT, message: err.message });
      break;
    case constants.INTERNAL_SERVER:
      res.json({ statu: constants.INTERNAL_SERVER, message: err.message });
      break;
    default:
      res.json({ statu: statusCode, message: err.message });
      break;
  }
};

module.exports = errorHandler;
