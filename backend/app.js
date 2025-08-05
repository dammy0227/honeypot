const express = require("express");
const cors = require("cors");
const trapRoutes = require("./routes/trapRoutes");
const requestLogger = require("./middleware/requestLogger");
const rateLimiter = require("./middleware/rateLimiter");



const app = express();
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(rateLimiter);
app.use("/api", trapRoutes);
require("./cron");


module.exports = app;
