const multer = require("multer");
const fs = require("fs");
const path = require("path");

const Log = require("../models/Log");
const { detectAttack } = require("../services/detector");
const { sendDiscordAlert } = require("../services/alertService");
const { getGeoInfo } = require("../services/geoIP");

let lastDiscordAlert = null;

exports.updateLastDiscordAlert = (alert) => {
  lastDiscordAlert = {
    ...alert,
    timestamp: new Date(),
  };
};

exports.getDiscordStatus = async (req, res) => {
  res.json({
    status: "connected",
    lastAlert: lastDiscordAlert,
  });
};

// Setup multer
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

exports.trapHandler = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const ua = req.headers["user-agent"];
    const route = req.originalUrl;
    const payload = req.body;

    const geoInfo = await getGeoInfo(ip);

    let attackType = detectAttack(payload);
    let loggedPayload = payload;

    // Special case: File upload
    if (req.file) {
      const fileInfo = {
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path
      };

      // Naive detection: Dangerous extensions
      const ext = path.extname(fileInfo.originalName).toLowerCase();
      const dangerous = [".exe", ".sh", ".php", ".js", ".bat", ".py"];

      if (dangerous.includes(ext)) {
        attackType = "MALICIOUS_FILE";
      }

      loggedPayload = fileInfo;
    }

    const log = new Log({
      ipAddress: ip,
      userAgent: ua,
      routeAccessed: route,
      payload: loggedPayload,
      attackType,
      geoInfo
    });

    await log.save();

    if (attackType !== "Normal") {
      await sendDiscordAlert(log);
      exports.updateLastDiscordAlert({
        ip,
        route,
        attackType,
        geoInfo
      });
    }

    res.status(200).json({ message: "Logged" });
  } catch (err) {
    console.error("Trap handler error:", err);
    res.status(500).json({ message: "Failed to log" });
  }
};


exports.getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    res.status(500).json({ message: "Error fetching logs" });
  }
};


exports.adminActionHandler = async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const ua = req.headers["user-agent"];
    const route = "/admin-action";
    const { actionType } = req.body;

    const log = new Log({
      ipAddress: ip,
      userAgent: ua,
      routeAccessed: route,
      payload: { actionType },
      attackType: "ADMIN_ACTION"
    });

    await log.save();
    await sendDiscordAlert(log);

    exports.updateLastDiscordAlert({
      ip,
      route,
      attackType: "ADMIN_ACTION",
    });

    res.status(200).json({ message: "Admin action logged" });
  } catch (err) {
    console.error("Admin action error:", err);
    res.status(500).json({ message: "Failed to log admin action" });
  }
};
