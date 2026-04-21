function getRoot(req, res) {
  res.json({
    ok: true,
    message: "Exercise 3: User activity tracker (Mongoose middleware).",
  });
}

module.exports = { getRoot };
