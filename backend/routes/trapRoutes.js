const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  trapHandler,
  getDiscordStatus,
  getLogs,
  adminActionHandler
} = require("../controllers/trapController");

// Trap endpoints
router.post("/login", trapHandler);
router.post("/chat", trapHandler);
router.post("/upload", upload.single("file"), trapHandler);
router.get("/admin", trapHandler); // optional trap for curious GETs

// Admin panel action trap
router.post("/admin-action", adminActionHandler);

// Dashboard
router.get("/logs", getLogs);
router.get("/discord-status", getDiscordStatus);

module.exports = router;
