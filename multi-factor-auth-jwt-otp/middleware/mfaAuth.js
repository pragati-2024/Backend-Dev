const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");

function getBearerToken(req) {
  const header = req.headers.authorization;
  if (!header) return null;
  const [scheme, token] = header.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
}

function mfaAuth(req, res, next) {
  const jwtSecret = process.env.JWT_SECRET;
  const otpSecretBase32 = process.env.OTP_SECRET_BASE32;

  if (!jwtSecret) {
    return res.status(500).json({
      ok: false,
      error: "Server misconfigured: JWT_SECRET missing",
    });
  }

  if (!otpSecretBase32) {
    return res.status(500).json({
      ok: false,
      error: "Server misconfigured: OTP_SECRET_BASE32 missing",
    });
  }

  const token = getBearerToken(req);
  if (!token) {
    return res.status(401).json({ ok: false, error: "Missing Bearer token" });
  }

  let payload;
  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return res.status(401).json({ ok: false, error: "Invalid/expired JWT" });
  }

  const otp = req.headers["x-otp"];
  if (!otp) {
    return res
      .status(401)
      .json({ ok: false, error: "Missing OTP (x-otp header)" });
  }

  const otpOk = speakeasy.totp.verify({
    secret: otpSecretBase32,
    encoding: "base32",
    token: String(otp),
    window: 1,
  });

  if (!otpOk) {
    return res.status(401).json({ ok: false, error: "Invalid OTP" });
  }

  req.user = payload;
  next();
}

module.exports = { mfaAuth };
