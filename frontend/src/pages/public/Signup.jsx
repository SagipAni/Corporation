import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoleToggle from "../../components/RoleToggle.jsx";
import LogoPill from "../../components/LogoPill.jsx";
import "../../styles/auth.css";

const content = {
  buyer: {
    title: "Create your buyer account",
    subtitle: "Join to order fresh produce from local farmers.",
    headline: ["Buy fresh.", "Buy local."],
    blurb: "Create free account and start ordering in minutes.",
  },
  seller: {
    title: "Create your seller account",
    subtitle: "Join to sell fresh produce to local buyers.",
    headline: ["Sell fresh.", "Sell local."],
    blurb: "Create free account and start selling in minutes.",
  },
};

function Signup() {
  const [tab, setTab] = useState("buyer");
  const navigate = useNavigate();
  const text = content[tab];

  // FRONTEND-ONLY DEMO: nothing is saved yet. After checking the form
  // we just send the visitor to the login page.
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const confirm = form.elements.confirmPassword;
    const mismatch = form.elements.password.value !== confirm.value;
    confirm.setCustomValidity(mismatch ? "Passwords do not match" : "");
    if (!form.reportValidity()) return;
    navigate("/login");
  }

  return (
    <main className="auth-page auth-signup">
      <div className="auth-top-bar">
        <Link to="/login" className="back-circle" aria-label="Back to home">
          ←
        </Link>
        <LogoPill />
      </div>
      <aside className="auth-photo">
        <h2>
          {text.headline[0]}
          <br />
          {text.headline[1]}
        </h2>
        <p>{text.blurb}</p>
      </aside>

      <section className="auth-form-side">
        <header className="auth-heading">
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
        </header>

        <RoleToggle value={tab} onChange={setTab} />

        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === "seller" && (
            <label className="auth-field" htmlFor="generatedId">
              Generated ID
              <input
                id="generatedId"
                className="auth-input"
                type="text"
                placeholder="#gjdeidaw34235"
                readOnly
              />
            </label>
          )}

          <label className="auth-field" htmlFor="fullName">
            Full name
            <input
              id="fullName"
              name="fullName"
              className="auth-input"
              type="text"
              placeholder="Your full name"
              required
            />
          </label>

          {tab === "buyer" && (
            <label className="auth-field" htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                className="auth-input"
                type="email"
                placeholder="you@example.com"
                required
              />
            </label>
          )}

          <label className="auth-field" htmlFor="address">
            Address
            <input
              id="address"
              name="address"
              className="auth-input"
              type="text"
              placeholder="Your full address"
              required
            />
          </label>

          <label className="auth-field" htmlFor="password">
            Password
            <input
              id="password"
              name="password"
              className="auth-input"
              type="password"
              placeholder="At least 8 characters"
              minLength={8}
              required
            />
          </label>

          <label className="auth-field" htmlFor="confirmPassword">
            Confirm your password
            <input
              id="confirmPassword"
              name="confirmPassword"
              className="auth-input"
              type="password"
              placeholder="Confirm password"
              onInput={(event) => event.target.setCustomValidity("")}
              required
            />
          </label>

          <button type="submit" className="auth-button auth-button-upper">
            CREATE ACCOUNT
          </button>
        </form>

        <p className="auth-footer-text">
          Already registered?{" "}
          <Link to="/login" className="auth-link">
            Log in
          </Link>
        </p>
      </section>
    </main>
  );
}

export default Signup;
