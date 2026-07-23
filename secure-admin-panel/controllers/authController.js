const USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" },
];

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

  req.session.user = { username: found.username, role: found.role };
  res.redirect("/");
};

exports.getLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getMe = (req, res) => {
  if (!req.session.user) {
    return res.send('<p>Not logged in.</p><p><a href="/login">Login</a></p>');
  }

  res.send(`
    <h1>My Profile</h1>
    <pre>${escapeHtml(JSON.stringify(req.session.user, null, 2))}</pre>
    <p><a href="/">Home</a></p>
  `);
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
