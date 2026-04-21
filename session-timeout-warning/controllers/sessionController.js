exports.getHome = (sessionMaxAgeMs) => {
  return (req, res) => {
    const startedAt = Number(req.session.startedAt || Date.now());
    const expiresAt = startedAt + sessionMaxAgeMs;

    res.send(`
      <h1>Session Timeout Warning</h1>
      <p>This demo uses a short session (2 minutes) so you can test quickly.</p>

      <p>
        <a href="/ping">Ping (server hit)</a> |
        <a href="/reset">Reset session</a>
      </p>

      <div id="status"></div>

      <script>
        const WARNING_BEFORE_MS = 30 * 1000; // warn 30s before expiry

        async function getSessionInfo() {
          const res = await fetch('/session-info', { cache: 'no-store' });
          if (!res.ok) throw new Error('Failed to fetch session info');
          return res.json();
        }

        function format(ms) {
          const s = Math.max(0, Math.floor(ms / 1000));
          const m = Math.floor(s / 60);
          const r = s % 60;
          return String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0');
        }

        async function start() {
          const info = await getSessionInfo();
          const status = document.getElementById('status');

          function render() {
            const now = Date.now();
            const remaining = info.expiresAt - now;

            let html = '';
            html += '<p>Session started at: <b>' + new Date(info.startedAt).toLocaleTimeString() + '</b></p>';
            html += '<p>Session expires at: <b>' + new Date(info.expiresAt).toLocaleTimeString() + '</b></p>';
            html += '<p>Time remaining: <b>' + format(remaining) + '</b></p>';

            if (remaining <= 0) {
              html += '<p style="color:red"><b>Session expired.</b> Refresh to start a new session.</p>';
            } else if (remaining <= WARNING_BEFORE_MS) {
              html += '<p style="color:orange"><b>Warning:</b> your session is about to expire.</p>';
            }

            status.innerHTML = html;
          }

          render();
          setInterval(render, 1000);
        }

        start().catch((e) => {
          document.getElementById('status').innerHTML = '<p style="color:red">' + e.message + '</p>';
        });
      </script>
    `);
  };
};

exports.getSessionInfo = (sessionMaxAgeMs) => {
  return (req, res) => {
    const startedAt = Number(req.session.startedAt || Date.now());
    const expiresAt = startedAt + sessionMaxAgeMs;

    res.json({
      startedAt,
      expiresAt,
      now: Date.now(),
    });
  };
};

exports.getPing = (req, res) => {
  // This endpoint demonstrates a request that does NOT extend the expiry
  // because rolling=false and we use a fixed startedAt.
  res.send(
    '<p>Ping received. (This does not extend expiry.)</p><p><a href="/">Back</a></p>',
  );
};

exports.getReset = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
