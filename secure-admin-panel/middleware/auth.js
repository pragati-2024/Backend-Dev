exports.requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res
      .status(401)
      .send('<p>Not logged in.</p><p><a href="/login">Login</a></p>');
  }
  next();
};

exports.requireRole = (role) => {
  return (req, res, next) => {
    const user = req.session.user;
    if (!user) {
      return res
        .status(401)
        .send('<p>Not logged in.</p><p><a href="/login">Login</a></p>');
    }

    if (user.role !== role) {
      return res
        .status(403)
        .send(
          '<p>Forbidden: insufficient role.</p><p><a href="/">Home</a></p>',
        );
    }

    next();
  };
};
