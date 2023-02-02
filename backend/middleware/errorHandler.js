const { logEvents } = require("./logger");

const errorHandler = (error, req, res, next) => {
  logEvents(
    `${error.name}: ${error.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errorLog.log"
  );
  console.log(error.stack);

  res.status(res.statusCode ? res.statusCode : 500);

  res.json({ message: error.message });
};

module.exports = errorHandler;
