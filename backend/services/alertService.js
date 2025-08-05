const axios = require("axios");
const webhookURL = process.env.DISCORD_WEBHOOK_URL;

const sendDiscordAlert = async (logData) => {
  const { ipAddress, routeAccessed, attackType, payload } = logData;

  const content = {
    username: "🛡️ Honeypot Alert",
    content: `🚨 **${attackType} detected**
📍 Route: \`${routeAccessed}\`
🌐 IP: \`${ipAddress}\`
🧬 Payload: \`\`\`json\n${JSON.stringify(payload, null, 2)}\`\`\``
  };

  try {
    await axios.post(webhookURL, content);
    console.log("✅ Discord alert sent.");
  } catch (err) {
    console.error("❌ Discord alert failed:", err.response?.data || err.message || err);
  }
};

module.exports = { sendDiscordAlert };
