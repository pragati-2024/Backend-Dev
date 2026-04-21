const express = require("express");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 20 * 60 * 1000,
    },
  }),
);

app.use("/", authRoutes);
app.use("/", adminRoutes);

app.get("/", (req, res) => {
  res.send(`
    <h1>Secure Admin Panel (Sessions + RBAC)</h1>
    <ul>
      <li><a href="/login">Login</a></li>
      <li><a href="/me">My Profile</a></li>
      <li><a href="/admin">Admin Panel</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
    <p>Demo users:</p>
    <ul>
      <li>admin / admin123 (role: admin)</li>
      <li>user / user123 (role: user)</li>
    </ul>
  `);
});

module.exports = app;
