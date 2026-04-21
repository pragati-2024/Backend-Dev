function getRegistration(req) {
  if (!req.session.registration) req.session.registration = {};
  return req.session.registration;
}

exports.getStepOne = (req, res) => {
  const registration = getRegistration(req);

  res.send(`
    <h1>Step One</h1>
    <form method="POST" action="/register/step-one">
      <label>Full Name</label><br />
      <input name="fullName" value="${escapeHtml(registration.fullName || "")}" required />
      <br /><br />

      <label>Email</label><br />
      <input name="email" type="email" value="${escapeHtml(registration.email || "")}" required />
      <br /><br />

      <button type="submit">Next</button>
    </form>
    <p><a href="/">Home</a></p>
  `);
};

exports.postStepOne = (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    return res
      .status(400)
      .send(
        '<p>Missing fullName or email.</p><p><a href="/register/step-one">Back</a></p>',
      );
  }

  const registration = getRegistration(req);
  registration.fullName = String(fullName).trim();
  registration.email = String(email).trim();

  res.redirect("/register/step-two");
};

exports.getStepTwo = (req, res) => {
  const registration = getRegistration(req);

  res.send(`
    <h1>Step Two</h1>
    <form method="POST" action="/register/step-two">
      <label>Country</label><br />
      <input name="country" value="${escapeHtml(registration.country || "")}" required />
      <br /><br />

      <label>Age</label><br />
      <input name="age" type="number" min="1" max="120" value="${escapeHtml(registration.age || "")}" required />
      <br /><br />

      <button type="submit">Review</button>
    </form>
    <p><a href="/register/step-one">Back</a></p>
  `);
};

exports.postStepTwo = (req, res) => {
  const { country, age } = req.body;

  if (!country || !age) {
    return res
      .status(400)
      .send(
        '<p>Missing country or age.</p><p><a href="/register/step-two">Back</a></p>',
      );
  }

  const parsedAge = Number(age);
  if (!Number.isFinite(parsedAge) || parsedAge < 1 || parsedAge > 120) {
    return res
      .status(400)
      .send('<p>Invalid age.</p><p><a href="/register/step-two">Back</a></p>');
  }

  const registration = getRegistration(req);
  registration.country = String(country).trim();
  registration.age = String(parsedAge);

  res.redirect("/register/review");
};

exports.getReview = (req, res) => {
  const registration = getRegistration(req);

  const missing = ["fullName", "email", "country", "age"].filter(
    (k) => !registration[k],
  );
  if (missing.length) {
    return res.redirect("/register/step-one");
  }

  res.send(`
    <h1>Review</h1>
    <ul>
      <li>Full Name: ${escapeHtml(registration.fullName)}</li>
      <li>Email: ${escapeHtml(registration.email)}</li>
      <li>Country: ${escapeHtml(registration.country)}</li>
      <li>Age: ${escapeHtml(registration.age)}</li>
    </ul>

    <form method="POST" action="/register/submit">
      <button type="submit">Submit</button>
    </form>

    <p><a href="/register/step-two">Back</a></p>
  `);
};

exports.postSubmit = (req, res) => {
  const registration = getRegistration(req);

  const missing = ["fullName", "email", "country", "age"].filter(
    (k) => !registration[k],
  );
  if (missing.length) {
    return res
      .status(400)
      .send(
        '<p>Registration data incomplete.</p><p><a href="/register/step-one">Start again</a></p>',
      );
  }

  const submitted = { ...registration };
  req.session.registration = null;

  res.send(`
    <h1>Submitted</h1>
    <p>Session-stored registration submitted successfully.</p>
    <pre>${escapeHtml(JSON.stringify(submitted, null, 2))}</pre>
    <p><a href="/register/step-one">Register again</a></p>
  `);
};

exports.postReset = (req, res) => {
  req.session.registration = null;
  res.redirect("/register/step-one");
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
