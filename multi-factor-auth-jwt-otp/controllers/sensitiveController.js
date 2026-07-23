function sensitiveOperation(req, res) {
  res.json({
    ok: true,
    message: "Sensitive operation allowed.",
    user: req.user,
  });
}

module.exports = { sensitiveOperation };
