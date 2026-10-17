import { useState } from "react";
import SettingsMenu from "../../components/SettingsMenu.jsx";
import { useRole } from "../../context/RoleContext.jsx";
import "../../styles/shared.css";

const linkedDevices = [
  { name: "iPhone 14", lastSeen: "Active now" },
  { name: "Chrome on Windows", lastSeen: "Last active 2 days ago" },
  { name: "Android tablet", lastSeen: "Last active 3 weeks ago" },
];

function AccountSecurity() {
  const { role } = useRole();
  const [twoFactor, setTwoFactor] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [pwOpen, setPwOpen] = useState(false);
  const [signedOut, setSignedOut] = useState([]);
  const [notice, setNotice] = useState("");

  function handlePasswordSubmit(event) {
    event.preventDefault();
    setNotice(
      "Password change is a preview only; connect authentication to save it.",
    );
    setPwOpen(false);
  }

  function signOutDevice(name) {
    setSignedOut((list) => (list.includes(name) ? list : [...list, name]));
  }

  function signOutAll() {
    setSignedOut(linkedDevices.slice(1).map((d) => d.name));
    setNotice("Other devices have been signed out in this preview.");
  }

  return (
    <div className="shared-page settings-mock-page">
      <h2 className="section-title">Account &amp; Security</h2>
      <div className="settings-mock-layout">
        <SettingsMenu />
        <div className="settings-mock-main">
          
          <section className="mock-white-card security-card">
            <div className="security-row">
              <div>
                <strong>Password</strong>
                <p>Last changed (DATE)</p>
              </div>
              <button
                type="button"
                className="mock-btn"
                onClick={() => setPwOpen((open) => !open)}
              >
                Change password
              </button>
            </div>

            {pwOpen && (
              <form className="password-form" onSubmit={handlePasswordSubmit}>
                <input
                  className="mock-input"
                  type="password"
                  placeholder="Current password"
                  aria-label="Current password"
                  required
                />
                <input
                  className="mock-input"
                  type="password"
                  placeholder="New password"
                  aria-label="New password"
                  minLength={8}
                  required
                />
                <button type="submit" className="mock-btn solid">
                  Update password
                </button>
              </form>
            )}

            <div className="security-row">
              <div>
                <strong>Two-factor authentication (2FA)</strong>
                <p>
                  Require a code from your authenticator app or SMS when signing
                  in on a new device.
                </p>
              </div>
              <div className="security-inline">
                <span>{twoFactor ? "On · Authenticator app" : "Off"}</span>
                <button
                  type="button"
                  className="mock-btn solid"
                  onClick={() => setTwoFactor((on) => !on)}
                >
                  {twoFactor ? "Manage" : "Enable"}
                </button>
              </div>
            </div>

            <div className="security-row">
              <div>
                <strong className="security-heading">Login alerts</strong>
                <p>
                  Email me when someone signs in from a new device or location.
                </p>
              </div>
              <button
                type="button"
                aria-pressed={alerts}
                aria-label="Login alerts"
                className={alerts ? "mock-switch on" : "mock-switch"}
                onClick={() => setAlerts((on) => !on)}
              >
                <span />
              </button>
            </div>

            <div className="security-devices">
              <h3>Linked devices</h3>
              {linkedDevices.map((device, index) => {
                const isCurrent = index === 0;
                const isSignedOut = signedOut.includes(device.name);

                return (
                  <div className="device-row" key={device.name}>
                    <span className="device-avatar" />
                    <div>
                      <strong>{device.name}</strong>
                      <p>(LOCATION) · {device.lastSeen}</p>
                    </div>
                    <button
                      type="button"
                      className="mock-btn"
                      disabled={isCurrent || isSignedOut}
                      onClick={() => signOutDevice(device.name)}
                    >
                      {isCurrent
                        ? "This device"
                        : isSignedOut
                          ? "Signed out"
                          : "Sign out"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <button
            type="button"
            className="mock-btn solid signout-all"
            onClick={signOutAll}
          >
            Sign out of all other devices
          </button>
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

export default AccountSecurity;
