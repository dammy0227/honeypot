const cron = require("node-cron");
const fs = require("fs");
const path = require("path");

cron.schedule("0 * * * *", () => {
  const dir = path.join(__dirname, "uploads");

  fs.readdir(dir, (err, files) => {
    if (err) return;

    files.forEach((file) => {
      fs.unlink(path.join(dir, file), () => {});
    });
  });

  console.log("🧹 Uploads cleaned up hourly");
});
