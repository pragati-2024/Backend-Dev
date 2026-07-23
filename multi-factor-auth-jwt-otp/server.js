require("dotenv").config();

const { createApp } = require("./app");

const app = createApp();

const port = process.env.PORT || 3002;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}`);
});
