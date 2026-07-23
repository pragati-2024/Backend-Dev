const xss = require("xss");

function hasDangerousKey(key) {
  // Helps block common NoSQL injection patterns like: { "$gt": "" }
  return key.includes("$") || key.includes(".");
}

function escapeSqlString(input) {
  // Basic string escaping (practice-level). Real SQL safety comes from parameterized queries.
  return input
    .replace(/\\/g, "\\\\")
    .replace(/\u0000/g, "\\0")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\x1a/g, "\\Z")
    .replace(/'/g, "\\'")
    .replace(/\"/g, '\\"')
    .replace(/--/g, "")
    .replace(/;/g, "");
}

function sanitizeAny(value) {
  if (value == null) return value;

  if (typeof value === "string") {
    const xssClean = xss(value);
    return escapeSqlString(xssClean);
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeAny);
  }

  if (typeof value === "object") {
    const out = {};
    for (const [key, val] of Object.entries(value)) {
      if (hasDangerousKey(key)) continue;
      out[key] = sanitizeAny(val);
    }
    return out;
  }

  return value;
}

function sanitizeInputs(req, res, next) {
  req.body = sanitizeAny(req.body);
  req.query = sanitizeAny(req.query);
  req.params = sanitizeAny(req.params);
  next();
}

module.exports = { sanitizeInputs };
