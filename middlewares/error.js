module.exports = (err, req, res, next) => {
  if (err.name === "TokenExpiredError") {
    err.statusCode = 401;
    err.message = err.errors[0].message;
  }

  if (err.name === "JsonWebTokenError") {
    err.statusCode = 401;
    err.message = err.errors[0].message;
  }

  if (err.name === "SequelizeValidationError") {
    err.statusCode = 400;
    err.message = err.errors[0].message;
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    err.statusCode = 400;
    err.message = err.errors[0].message;
  }
  res.status(500).json({ message: err.message });
};
