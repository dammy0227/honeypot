const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} from ${req.ip}`);
  next();
};

module.exports = requestLogger;
 