const jwt = require("jsonwebtoken");

function login(req, res) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ ok: false, error: "JWT_SECRET missing" });
  }

  const { username = "demo" } = req.body || {};

  const token = jwt.sign({ sub: "user-1", username }, jwtSecret, {
    expiresIn: "15m",
  });

  res.json({ ok: true, token });
}

module.exports = { login };
