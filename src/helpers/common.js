const response = (res, statusCode, status, result, message) => {
  const printResult = {};
  printResult.succes = status;
  printResult.statusCode = statusCode;
  printResult.data = result || null;
  printResult.message = message || null;
  res.status(statusCode).json(printResult);
  console.log("PRINT", printResult);
};

module.exports = { response };
