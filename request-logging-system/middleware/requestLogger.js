const fs = require('fs');
const path = require('path');

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function createRequestLogger({ logFilePath } = {}) {
  const resolvedLogFilePath = logFilePath
    ? path.resolve(logFilePath)
    : path.resolve(process.cwd(), 'logs', 'access.log');

  ensureDirSync(path.dirname(resolvedLogFilePath));

  return function requestLogger(req, res, next) {
    const startNs = process.hrtime.bigint();

    res.on('finish', () => {
      const endNs = process.hrtime.bigint();
      const durationMs = Number(endNs - startNs) / 1e6;

      const entry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl || req.url,
        statusCode: res.statusCode,
        responseTimeMs: Math.round(durationMs * 1000) / 1000
      };

      fs.appendFile(resolvedLogFilePath, JSON.stringify(entry) + '\n', (err) => {
        if (err) {
          // Don't break requests due to logging failures
          // eslint-disable-next-line no-console
          console.error('Failed to write request log:', err.message);
        }
      });
    });

    next();
  };
}

module.exports = { createRequestLogger };
