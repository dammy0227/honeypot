const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  ipAddress: String,
  userAgent: String,
  routeAccessed: String,
  payload: mongoose.Schema.Types.Mixed,
  attackType: { type: String, default: "Normal" },
  geoInfo: Object,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Log", logSchema);
