const os = require("os");
const fs = require("fs");

function startLogger() {
  setInterval(() => {
    const info = `
Time: ${new Date().toLocaleString()}
Platform: ${os.platform()}
CPU Architecture: ${os.arch()}
Total Memory: ${os.totalmem()}
Free Memory: ${os.freemem()}
`;

    fs.appendFile("systemInfo.txt", info, () => {});
  }, 5000);
}

module.exports = { startLogger };
