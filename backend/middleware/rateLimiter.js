const { RateLimiterMemory } = require("rate-limiter-flexible");

const rateLimiter = new RateLimiterMemory({
  points: 10, // max 10 requests
  duration: 60 // per 60 seconds
});

const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter.consume(req.ip)
    .then(() => next())
    .catch(() => res.status(429).json({ message: "Too many requests" }));
};

module.exports = rateLimiterMiddleware;
