const jwt = require("jsonwebtoken");

function getBearerToken(req) {
  const header = req.headers.authorization;
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

function auth(req, res, next) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ ok: false, error: "JWT_SECRET missing" });
  }

  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ ok: false, error: "Missing Bearer token" });
  }

  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch {
    return res.status(401).json({ ok: false, error: "Invalid/expired JWT" });
  }

  req.userId = payload.sub;
  req.sessionId = payload.sid;
  next();
}

module.exports = { auth };
