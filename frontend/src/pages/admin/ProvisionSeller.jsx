import { useState } from "react";
import Button from "../../components/Button.jsx";
import ToggleRow from "../../components/ToggleRow.jsx";
import { recentlyIssued } from "../../constants/adminData.js";
import "../../styles/admin.css";

// The design shows these two boxes empty, so they start empty here too.
const sellerId = "";
const temporaryPassword = "";

function copyText(text) {
  if (text && navigator.clipboard) navigator.clipboard.writeText(text);
}

function ProvisionSeller() {
  const [requireReset, setRequireReset] = useState(true);
  const [sendOnSave, setSendOnSave] = useState(true);
  const [verifiedNow, setVerifiedNow] = useState(true);

  function handleSubmit(event) {
    // Frontend-only for now: nothing is saved.
    event.preventDefault();
  }

  return (
    <div className="admin-page provision-grid">
      <form onSubmit={handleSubmit}>
        <h2 className="section-title" style={{ textTransform: "uppercase" }}>
          NEW SELLER PROFILE
        </h2>
        <p className="section-desc" style={{ marginTop: 0 }}>
          Fields marked required must be completed before credentials can be
          issued.
        </p>

        <p className="eyebrow" style={{ margin: "26px 0 14px" }}>
          CONTACT &amp; BUSINESS INFO
        </p>
        <div className="form-grid">
          <label className="field">
            Full Name (Required)
            <input className="text-input" type="text" name="fullName" />
          </label>
          <label className="field">
            Email (Required)
            <input className="text-input" type="email" name="email" />
          </label>
          <label className="field">
            Phone Number
            <input className="text-input" type="tel" name="phone" />
          </label>
          <label className="field">
            Business Name
            <input className="text-input" type="text" name="businessName" />
          </label>
        </div>

        <p className="eyebrow" style={{ margin: "30px 0 10px" }}>
          VERIFICATION
        </p>
        <p className="section-desc" style={{ margin: "0 0 14px" }}>
          Verification documents optional at this stage
        </p>
        <div className="upload-grid">
          <label className="upload-tile">
            <span aria-hidden="true">⬇</span>
            <span>Gov't ID</span>
            <input type="file" hidden />
          </label>
          <label className="upload-tile">
            <span aria-hidden="true">⬇</span>
            <span>Business permit</span>
            <input type="file" hidden />
          </label>
          <label className="upload-tile">
            <span aria-hidden="true">⬇</span>
            <span>Proof of address</span>
            <input type="file" hidden />
          </label>
        </div>

        <p className="eyebrow" style={{ margin: "30px 0 14px" }}>
          ACCOUNT SETTINGS
        </p>
        <div className="toggle-list">
          <ToggleRow
            title="Require password reset on first login"
            description="Recommended for all new accounts"
            checked={requireReset}
            onChange={setRequireReset}
          />
          <ToggleRow
            title="Send credentials automatically on save"
            description="Otherwise, admin delivers them manually"
            checked={sendOnSave}
            onChange={setSendOnSave}
          />
          <ToggleRow
            title="Mark account as verified immediately"
            description="Skips the pending verification badge"
            checked={verifiedNow}
            onChange={setVerifiedNow}
          />
        </div>

        <div className="button-row">
          <button type="submit" className="btn btn-solid">
            Create Profile &amp; issue iD
          </button>
          <Button>Save As Draft</Button>
          <Button to="/admin/dashboard">Cancel</Button>
        </div>
      </form>

      <aside>
        <div className="created-banner">
          <div className="created-check" aria-hidden="true">
            ✓
          </div>
          <div>
            <div className="created-title">Seller profile created</div>
            <div className="sub-text">Credentials generated just now</div>
          </div>
        </div>

        <div className="credentials-card">
          <div className="credential-row">
            <span className="credential-label">SELLER ID</span>
            <span className="credential-value">{sellerId}</span>
            <button
              type="button"
              className="copy-button"
              onClick={() => copyText(sellerId)}
            >
              COPY
            </button>
          </div>
          <div className="credential-row">
            <span className="credential-label">TEMPORARY PASSWORD</span>
            <span className="credential-value">{temporaryPassword}</span>
            <button
              type="button"
              className="copy-button"
              onClick={() => copyText(temporaryPassword)}
            >
              COPY
            </button>
          </div>
          <button type="button" className="regenerate-button">
            Regenerate password (invalidates the one above)
          </button>
        </div>

        <div className="warning-box">
          ▲ This password is shown once. Make sure it's delivered or copied
          before leaving this screen — it cannot be retrieved later, only reset.
        </div>

        <h3 className="card-heading" style={{ margin: "26px 0 0" }}>
          Deliver credentials via
        </h3>
        <div className="check-list">
          <label>
            <input type="checkbox" defaultChecked /> Email to
            maria@hearthhome.farm
          </label>
          <label>
            <input type="checkbox" defaultChecked /> SMS to +63 900 000 0000
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Print / export as PDF for
            in-person handoff
          </label>
        </div>
        <div className="row-between" style={{ justifyContent: "flex-start" }}>
          <Button variant="solid" upper>
            SEND CREDENTIALS
          </Button>
          <Button upper>DONE</Button>
        </div>

        <p className="eyebrow" style={{ margin: "30px 0 14px" }}>
          RECENTLY ISSUED (THIS SESSION)
        </p>
        <div className="list-card" style={{ padding: "12px 28px" }}>
          {recentlyIssued.map((seller) => (
            <div key={seller.sellerId} className="list-item">
              <span>{seller.business}</span>
              <span>{seller.sellerId}</span>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default ProvisionSeller;
