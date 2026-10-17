import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoleToggle from "../../components/RoleToggle.jsx";
import LogoPill from "../../components/LogoPill.jsx";
import { useRole } from "../../context/RoleContext.jsx";
import { roleHome } from "../../constants/roles.js";
import "../../styles/auth.css";

const content = {
  buyer: {
    title: "Welcome back",
    subtitle: "Login in to buy fresh produce straight from farmers.",
    headline: ["From the farm", "to your table."],
    blurb: "Browse fresh vegetables, fruit and grains from local sellers.",
  },
  seller: {
    title: "Seller access",
    subtitle: "Enter your Seller ID to open your store.",
    headline: ["Sell directly", "to buyers."],
    blurb: "Your admin sets up your store. Log in to start listing.",
  },
};

function Login() {
  const [tab, setTab] = useState("buyer");
  const { setRole } = useRole();
  const navigate = useNavigate();
  const text = content[tab];

  // Frontend-only test accounts. This is demo authentication, not production security.
  const [loginError, setLoginError] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const typed = form.elements.identifier.value.trim().toLowerCase();
    const password = form.elements.password.value;
    const accounts = {
      buyer: ["buyer", "buyer@sagipani.test", "buyer@sagipani.com"],
      seller: ["seller", "seller@sagipani.test", "seller@sagipani.com"],
      admin: ["admin", "admin@sagipani.test", "admin@sagipani.com"],
    };
    const requestedRole = accounts.admin.includes(typed) ? "admin" : tab;
    if (password !== "test123" || !accounts[requestedRole].includes(typed)) {
      setLoginError(
        "Invalid test account or password. Use one of the demo accounts below.",
      );
      return;
    }
    setLoginError("");
    setRole(requestedRole);
    navigate(roleHome[requestedRole]);
  }

  return (
    <main className="auth-page auth-login">
      <div className="auth-top-left">
        <Link to="/" className="back-circle" aria-label="Back to home">
          X
        </Link>
        <LogoPill />
      </div>

      <section className="auth-form-side">
        <header className="auth-heading">
          <h1>{text.title}</h1>
          <p>{text.subtitle}</p>
        </header>

        <RoleToggle value={tab} onChange={setTab} />

        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === "seller" && (
            <p className="auth-note">
              Your admin gives you a unique Seller ID. Enter it and tap the
              button to go to your store.
            </p>
          )}

          <label className="auth-field" htmlFor="identifier">
            {tab === "buyer" ? "Email / Username" : "Seller ID"}
            <input
              id="identifier"
              name="identifier"
              className="auth-input"
              type="text"
              placeholder={
                tab === "buyer" ? "Email / username (buyer or admin)" : "seller"
              }
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
              placeholder="Enter your password"
              required
            />
          </label>

          {loginError && (
            <p role="alert" className="auth-error">
              {loginError}
            </p>
          )}
          <button type="submit" className="auth-button">
            {tab === "buyer" ? "Log in" : "Go to my store"}
          </button>

          {tab === "buyer" && (
            <button type="button" className="auth-button auth-button-glass">
              Continue with Google
            </button>
          )}
        </form>
        <div className="demo-accounts" aria-label="Demo login accounts">
          <strong>Testing accounts</strong>
          <span>
            Buyer: <b>buyer</b> / <b>test123</b>
          </span>
          <span>
            Seller: <b>seller</b> / <b>test123</b>
          </span>
          <span>
            Admin: <b>admin</b> / <b>test123</b>{" "}
            <small>(use the Buyer tab)</small>
          </span>
        </div>
        <p className="auth-corner-text">
          {tab === "buyer" ? (
            <>
              New buyer?{" "}
              <Link to="/signup" className="auth-link">
                Create an account
              </Link>
            </>
          ) : (
            <>
              Lost your ID?{" "}
              <button
                type="button"
                className="auth-link"
                title="The Contact Admin destination has not been provided yet"
              >
                Contact Admin
              </button>
            </>
          )}
        </p>
      </section>

      <aside className="auth-photo">
        <h2>
          {text.headline[0]}
          <br />
          {text.headline[1]}
        </h2>
        <p>{text.blurb}</p>
      </aside>
    </main>
  );
}

export default Login;
