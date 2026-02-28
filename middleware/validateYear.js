module.exports = (req, res, next) => {
  const { year } = req.body;

  if (!year || isNaN(year)) {
    return res.status(400).json({ error: "Year must be valid number" });
  }

  next();
};