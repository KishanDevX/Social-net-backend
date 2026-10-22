const app = require("./src/app");
const db = require("./src/config/db");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.query("SELECT 1");

    console.log("DATABASE CONNECTED SUCCESSFULLY.");

    app.listen(PORT, () => {
      console.log(`SERVER RUNNING - http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("DATABASE CONNECTION FAILED:");
    console.error(error.message);
  }
}

startServer();