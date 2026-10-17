import { useState } from "react";
import SettingsMenu from "../../components/SettingsMenu.jsx";
import "../../styles/shared.css";
function Privacy() {
  const [visibility, setVisibility] = useState("Everyone");
  const [showLocation, setShowLocation] = useState(false);
  const [recommendations, setRecommendations] = useState(true);
  const [usage, setUsage] = useState(false);
  const [blocked, setBlocked] = useState(["(NAME)", "(NAME)"]);
  const [notice, setNotice] = useState("");
  const toggle = (value, set, label) => (
    <button
      type="button"
      aria-pressed={value}
      aria-label={label}
      className={value ? "mock-switch on" : "mock-switch"}
      onClick={() => set((v) => !v)}
    >
      <span />
    </button>
  );
  return (
    <div className="shared-page privacy-mock-page">
      <div className="privacy-head">
        <h2 className="section-title">Privacy</h2>
        <p className="section-desc">
          Control what others see and how your data is used.
        </p>
      </div>
      <div className="privacy-mock-layout">
        <SettingsMenu />
        <div className="privacy-mock-main">
          <section className="mock-white-card privacy-card">
            <div className="privacy-row">
              <div>
                <strong>Profile visibility</strong>
                <p>
                  Who can view your profile, purchase history badges, and
                  reviews you've written.
                </p>
              </div>
              <div className="visibility-options">
                {["Everyone", "Members", "Only me"].map((v) => (
                  <button
                    key={v}
                    type="button"
                    className={
                      visibility === v ? "mock-tab active" : "mock-tab"
                    }
                    onClick={() => setVisibility(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
            <div className="privacy-row">
              <div>
                <strong>Show exact location on shop page</strong>
                <p>
                  Off shows a general area only (e.g. "Cainta, Rizal"). Applies
                  to seller accounts.
                </p>
              </div>
              {toggle(
                showLocation,
                setShowLocation,
                "Show exact location on shop page",
              )}
            </div>
            <div className="privacy-row">
              <div>
                <strong>Personalized recommendations</strong>
                <p>Use browsing and purchase history to suggest products</p>
              </div>
              {toggle(
                recommendations,
                setRecommendations,
                "Personalized recommendations",
              )}
            </div>
            <div className="privacy-row">
              <div>
                <strong>Share usage data to improve the app</strong>
                <p>
                  Anonymous analytics only. Never includes message contents.
                </p>
              </div>
              {toggle(usage, setUsage, "Share usage data to improve the app")}
            </div>
            <div className="privacy-row">
              <div>
                <strong>Download or export my data</strong>
                <p>
                  Get a copy of your profile, orders, and messages. Ready within
                  48 hours.
                </p>
              </div>
              <button
                type="button"
                className="mock-btn"
                onClick={() =>
                  setNotice(
                    "Your data export request has been recorded in this preview.",
                  )
                }
              >
                Request export
              </button>
            </div>
          </section>
          <h3 className="blocked-title">Blocked users ({blocked.length})</h3>
          <section className="mock-white-card blocked-card">
            {blocked.map((name, i) => (
              <div className="blocked-row" key={`${name}-${i}`}>
                <span className="device-avatar small" />
                <div>
                  <strong>{name}</strong>
                  <p>
                    Blocked {i === 0 ? "Aug 12" : "Jul 30"} · Can't message you
                    or view your listings
                  </p>
                </div>
                <button
                  type="button"
                  className="text-action"
                  onClick={() =>
                    setBlocked((old) => old.filter((_, j) => j !== i))
                  }
                >
                  Unblock
                </button>
              </div>
            ))}
            {!blocked.length && <p className="sub-text">No blocked users.</p>}
          </section>
          <section className="mock-white-card delete-card">
            <div>
              <h3>Delete account</h3>
              <p>
                Permanently removes your profile, listings, and message history.
                Open orders and unpaid payouts must be settled first. This can't
                be undone after a 14-day grace period.
              </p>
            </div>
            <button
              type="button"
              className="mock-btn"
              onClick={() =>
                setNotice(
                  "Account deletion requires a connected account service and confirmation flow.",
                )
              }
            >
              Delete my account
            </button>
          </section>
          {notice && (
            <p className="sub-text" role="status">
              {notice}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
export default Privacy;
