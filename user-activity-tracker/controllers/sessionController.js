const jwt = require("jsonwebtoken");
const { UserSession } = require("../models/UserSession");

async function login(req, res) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return res.status(500).json({ ok: false, error: "JWT_SECRET missing" });
  }

  const { userId = "user-1" } = req.body || {};

  const session = new UserSession({ userId });
  await session.save();

  const token = jwt.sign({ sub: userId, sid: String(session._id) }, jwtSecret, {
    expiresIn: "1h",
  });

  res.json({ ok: true, token, sessionId: String(session._id) });
}

async function ping(req, res) {
  const session = await UserSession.findOneAndUpdate(
    { _id: req.sessionId, userId: req.userId },
    { $set: {} },
    { new: true },
  );

  if (!session) {
    return res.status(404).json({ ok: false, error: "Session not found" });
  }

  res.json({ ok: true, session });
}

async function logout(req, res) {
  const session = await UserSession.findOneAndUpdate(
    { _id: req.sessionId, userId: req.userId },
    { $set: { logoutAt: new Date() } },
    { new: true },
  );

  if (!session) {
    return res.status(404).json({ ok: false, error: "Session not found" });
  }

  res.json({ ok: true, session });
}

async function listSessions(req, res) {
  const sessions = await UserSession.find().sort({ createdAt: -1 }).limit(50);
  res.json({ ok: true, sessions });
}

module.exports = { login, ping, logout, listSessions };
