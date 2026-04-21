function echo(req, res) {
  res.json({
    ok: true,
    sanitized: {
      body: req.body,
      query: req.query,
      params: req.params
    }
  });
}

module.exports = { echo };
