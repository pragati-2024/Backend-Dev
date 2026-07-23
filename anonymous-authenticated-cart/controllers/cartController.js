const { getActiveCart, saveCookieCart } = require("../middleware/cartStore");

const PRODUCTS = [
  { id: "apple", name: "Apple", price: 100 },
  { id: "banana", name: "Banana", price: 60 },
  { id: "milk", name: "Milk", price: 200 },
];

exports.getHome = (req, res) => {
  const user = req.session.user;

  res.send(`
    <h1>Anonymous vs Authenticated Cart</h1>
    <p>
      Status: ${user ? `<b>Logged in</b> as ${escapeHtml(user.username)}` : "<b>Anonymous</b>"}
    </p>

    <p>
      <a href="/cart">View Cart</a> |
      <a href="/login">Login</a> |
      <a href="/logout">Logout</a>
    </p>

    <h2>Products</h2>
    <ul>
      ${PRODUCTS.map((p) => {
        return `
          <li>
            ${escapeHtml(p.name)} (Rs ${p.price})
            <form method="POST" action="/cart/add" style="display:inline">
              <input type="hidden" name="productId" value="${escapeHtml(p.id)}" />
              <button type="submit">Add</button>
            </form>
          </li>
        `;
      }).join("")}
    </ul>
  `);
};

exports.getCart = (req, res) => {
  const { storage, cart } = getActiveCart(req);

  const lines = Object.entries(cart)
    .map(([productId, qty]) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      const name = product ? product.name : `Unknown (${productId})`;
      return `<li>${escapeHtml(name)} — Qty: ${escapeHtml(qty)}</li>`;
    })
    .join("");

  res.send(`
    <h1>Your Cart</h1>
    <p>Storage: <b>${escapeHtml(storage)}</b> (${storage === "cookie" ? "anonymous" : "logged-in"})</p>

    <ul>
      ${lines || "<li>Empty</li>"}
    </ul>

    <form method="POST" action="/cart/clear">
      <button type="submit">Clear Cart</button>
    </form>

    <p><a href="/">Back</a></p>
  `);
};

exports.postAdd = (req, res) => {
  const { productId } = req.body;
  const id = String(productId || "").trim();
  if (!id)
    return res
      .status(400)
      .send('<p>Missing productId.</p><p><a href="/">Back</a></p>');

  const { storage, cart } = getActiveCart(req);
  cart[id] = Number(cart[id] || 0) + 1;

  if (storage === "cookie") {
    saveCookieCart(res, cart);
  }

  res.redirect("/cart");
};

exports.postClear = (req, res) => {
  const { storage } = getActiveCart(req);

  if (storage === "session") {
    req.session.cart = {};
  } else {
    saveCookieCart(res, {});
  }

  res.redirect("/cart");
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
