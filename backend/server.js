require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const cors = require("cors");

app.use(cors());


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
