const { migrateCookieCartToSession } = require("../middleware/cartStore");

const USERS = [{ username: "user", password: "user123" }];

exports.getLogin = (req, res) => {
  const error = req.query.error
    ? '<p style="color:red">Invalid credentials</p>'
    : "";

  res.send(`
    <h1>Login</h1>
    ${error}
    <form method="POST" action="/login">
      <label>Username</label><br />
      <input name="username" required />
      <br /><br />

      <label>Password</label><br />
      <input name="password" type="password" required />
      <br /><br />

      <button type="submit">Login</button>
    </form>
    <p><a href="/">Home</a></p>
  `);
};

exports.postLogin = (req, res) => {
  const { username, password } = req.body;

  const found = USERS.find(
    (u) =>
      u.username === String(username || "").trim() &&
      u.password === String(password || "").trim(),
  );

  if (!found) return res.redirect("/login?error=1");

  req.session.user = { username: found.username };

  // Migrate anonymous cookie-cart into session-cart on login.
  migrateCookieCartToSession(req, res);

  res.redirect("/cart");
};

exports.getLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
