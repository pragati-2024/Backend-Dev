const SUPPORTED = new Set(["en", "ur"]);

exports.getHome = (req, res) => {
  const lang = getLanguage(req);
  const text = getText(lang);

  res.send(`
    <h1>${escapeHtml(text.title)}</h1>
    <p>${escapeHtml(text.message)}</p>

    <p>Current language: <b>${escapeHtml(lang)}</b></p>

    <p>
      <a href="/lang/en">English</a> |
      <a href="/lang/ur">Urdu</a>
    </p>

    <p><a href="/clear">Clear language cookie</a></p>
  `);
};

exports.setLanguage = (req, res) => {
  const lang = String(req.params.lang || "").toLowerCase();
  if (!SUPPORTED.has(lang)) {
    return res
      .status(400)
      .send('<p>Unsupported language.</p><p><a href="/">Back</a></p>');
  }

  // 1 year persistence
  res.cookie("lang", lang, {
    maxAge: 365 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "lax",
  });

  res.redirect("/");
};

exports.clearLanguage = (req, res) => {
  res.clearCookie("lang");
  res.redirect("/");
};

function getLanguage(req) {
  const raw = req.cookies.lang;
  if (typeof raw === "string" && SUPPORTED.has(raw)) return raw;
  return "en";
}

function getText(lang) {
  if (lang === "ur") {
    return {
      title: "Language Preference (Cookies)",
      message: "Aap ki language cookie mein save ho rahi hai.",
    };
  }

  return {
    title: "Language Preference (Cookies)",
    message: "Your language is being saved in a cookie.",
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
