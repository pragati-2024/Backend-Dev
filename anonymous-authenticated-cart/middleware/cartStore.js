const CART_COOKIE = "cart";

exports.getActiveCart = (req) => {
  if (req.session.user) {
    if (!req.session.cart) req.session.cart = {};
    return { storage: "session", cart: req.session.cart };
  }

  const cookieCart = readCookieCart(req);
  return { storage: "cookie", cart: cookieCart };
};

exports.saveCookieCart = (res, cart) => {
  const safeCart = normalizeCart(cart);
  res.cookie(CART_COOKIE, encodeCart(safeCart), {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: false,
    sameSite: "lax",
  });
};

exports.clearCookieCart = (res) => {
  res.clearCookie(CART_COOKIE);
};

exports.migrateCookieCartToSession = (req, res) => {
  const cookieCart = readCookieCart(req);
  if (!req.session.cart) req.session.cart = {};

  for (const [productId, qty] of Object.entries(cookieCart)) {
    const current = Number(req.session.cart[productId] || 0);
    req.session.cart[productId] = current + Number(qty || 0);
  }

  exports.clearCookieCart(res);
};

function readCookieCart(req) {
  const raw = req.cookies[CART_COOKIE];
  if (!raw || typeof raw !== "string") return {};

  try {
    const decoded = JSON.parse(decodeURIComponent(raw));
    return normalizeCart(decoded);
  } catch {
    return {};
  }
}

function normalizeCart(value) {
  const result = {};
  if (!value || typeof value !== "object") return result;

  for (const [key, qty] of Object.entries(value)) {
    const productId = String(key);
    const n = Number(qty);
    if (!Number.isFinite(n)) continue;
    if (n <= 0) continue;
    result[productId] = Math.min(99, Math.floor(n));
  }

  return result;
}

function encodeCart(cart) {
  return encodeURIComponent(JSON.stringify(cart));
}
