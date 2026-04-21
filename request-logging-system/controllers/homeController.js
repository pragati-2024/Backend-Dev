async function getRoot(req, res) {
  res.json({ ok: true, message: 'Exercise 1: Request logging middleware is active.' });
}

async function getSlow(req, res) {
  await new Promise((r) => setTimeout(r, 250));
  res.json({ ok: true, message: 'This route is intentionally slow.' });
}

module.exports = { getRoot, getSlow };
