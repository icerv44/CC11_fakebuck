module.exports = (message, statusCode) => {
  const error = new Error(message);
  return (error.statusCode = statusCode);
};
