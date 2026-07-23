require("dotenv").config();

const { connectDb } = require("./config/db");
const { createApp } = require("./app");

const app = createApp();

const port = process.env.PORT || 3004;

connectDb()
  .then(() => {
    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("Failed to start:", err.message);
    process.exit(1);
  });
