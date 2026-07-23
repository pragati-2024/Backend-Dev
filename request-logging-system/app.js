const express = require('express');
const path = require('path');

const { createRequestLogger } = require('./middleware/requestLogger');
const homeRoutes = require('./routes/homeRoutes');

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(
    createRequestLogger({
      logFilePath: path.join(__dirname, 'logs', 'access.log')
    })
  );

  app.use('/', homeRoutes);

  return app;
}

module.exports = { createApp };
