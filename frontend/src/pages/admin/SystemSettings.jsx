import { useState } from "react";
import Button from "../../components/Button.jsx";
import Pill from "../../components/Pill.jsx";
import ToggleRow from "../../components/ToggleRow.jsx";
import { settingsTabs, productCategories } from "../../constants/adminData.js";
import "../../styles/admin.css";

function SystemSettings() {
  const [tab, setTab] = useState(settingsTabs[0]);

  // Verification requirements
  const [requireGovId, setRequireGovId] = useState(true);
  const [requirePermit, setRequirePermit] = useState(true);
  const [autoFlag, setAutoFlag] = useState(true);

  // Notification rules
  const [emailOnSignup, setEmailOnSignup] = useState(true);
  const [alertOnFlag, setAlertOnFlag] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  return (
    <div className="admin-page">
      <h2 className="section-title">System Settings</h2>
      <p className="section-desc">
        Manage categories, verification rules, notification rules, and analytics
        preferences platform-wide.
      </p>

      <div className="pill-row">
        {settingsTabs.map((name) => (
          <Pill key={name} active={tab === name} onClick={() => setTab(name)}>
            {name}
          </Pill>
        ))}
      </div>

      <div className="two-column">
        <section>
          <div className="row-between" style={{ marginBottom: 16 }}>
            <h3
              className="section-title"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.6rem",
                fontWeight: 700,
              }}
            >
              Product categories
            </h3>
            <Button small>+ Add category</Button>
          </div>
          <div className="category-list">
            {productCategories.map((category) => (
              <div key={category.name} className="category-row">
                <span>
                  <span className="category-handle" aria-hidden="true">
                    ⠿
                  </span>
                  {category.name}
                </span>
                <span>
                  {category.listings} <span aria-hidden="true">✎</span>
                </span>
              </div>
            ))}
          </div>

          <h3
            className="section-title"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.6rem",
              fontWeight: 700,
              margin: "32px 0 16px",
            }}
          >
            Verification requirements
          </h3>
          <div className="toggle-list">
            <ToggleRow
              title="Require gov't ID for new sellers"
              checked={requireGovId}
              onChange={setRequireGovId}
            />
            <ToggleRow
              title="Require business permit"
              checked={requirePermit}
              onChange={setRequirePermit}
            />
            <ToggleRow
              title="Auto-flag listings over ₱50,000"
              checked={autoFlag}
              onChange={setAutoFlag}
            />
          </div>

          <div className="button-row">
            <Button variant="solid">Save changes</Button>
            <Button>Reset to default</Button>
          </div>
        </section>

        <section>
          <h3
            className="section-title"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.6rem",
              fontWeight: 700,
              marginBottom: 16,
            }}
          >
            Notification rules
          </h3>
          <div className="toggle-list">
            <ToggleRow
              title="Email admins on new seller signup"
              checked={emailOnSignup}
              onChange={setEmailOnSignup}
            />
            <ToggleRow
              title="Alert on flagged listing"
              checked={alertOnFlag}
              onChange={setAlertOnFlag}
            />
            <ToggleRow
              title="Weekly digest to sellers"
              checked={weeklyDigest}
              onChange={setWeeklyDigest}
            />
          </div>

          <h3
            className="section-title"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.6rem",
              fontWeight: 700,
              margin: "28px 0 0",
            }}
          >
            Analytics
          </h3>
          <div className="analytics-tiles">
            <div className="analytics-tile">
              <span className="stat-label">Active sellers</span>
              <span
                className="stat-value"
                style={{ fontFamily: "var(--font-body)", fontSize: "2rem" }}
              >
                312
              </span>
            </div>
            <div className="analytics-tile">
              <span className="stat-label">Listings live</span>
              <span
                className="stat-value"
                style={{ fontFamily: "var(--font-body)", fontSize: "2rem" }}
              >
                1,904
              </span>
            </div>
          </div>
          <label>
            <input type="checkbox" defaultChecked /> Share anonymized analytics
            with sellers
          </label>
          <p className="small-note">
            manage help articles,respond to tickets, postsystem status updates
          </p>
        </section>
      </div>
    </div>
  );
}

export default SystemSettings;
