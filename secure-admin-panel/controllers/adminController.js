exports.getAdminHome = (req, res) => {
  res.send(`
    <h1>Admin Panel</h1>
    <p>Only users with role <b>admin</b> can see this.</p>
    <ul>
      <li><a href="/admin/stats">View Stats</a></li>
      <li><a href="/">Home</a></li>
    </ul>
  `);
};

exports.getAdminStats = (req, res) => {
  // Fake stats (in a real app, read from DB)
  const stats = {
    users: 2,
    serverTime: new Date().toISOString(),
    secretFlag: "admin-only-data",
  };

  res.send(`
    <h1>Admin Stats</h1>
    <pre>${escapeHtml(JSON.stringify(stats, null, 2))}</pre>
    <p><a href="/admin">Back</a></p>
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
