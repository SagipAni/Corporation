import { useState } from "react";
import Badge from "../../components/Badge.jsx";
import Button from "../../components/Button.jsx";
import SettingsMenu from "../../components/SettingsMenu.jsx";
import { useRole } from "../../context/RoleContext.jsx";
import { profiles } from "../../constants/sharedData.js";
import "../../styles/shared.css";

function Profile() {
  const { role } = useRole();
  const profile = profiles[role] || profiles.buyer;

  const [fields, setFields] = useState(profile.fields);
  const [draft, setDraft] = useState(profile.fields);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const displayName =
    fields.find((f) => f.key === "name")?.value || profile.name;

  function startEdit() {
    setDraft(fields);
    setSaved(false);
    setEditing(true);
  }

  function changeField(key, value) {
    setDraft((current) =>
      current.map((f) => (f.key === key ? { ...f, value } : f)),
    );
  }

  function handleSave(event) {
    // Frontend-only: kept in this page's state, not sent anywhere.
    event.preventDefault();
    setFields(draft);
    setEditing(false);
    setSaved(true);
  }

  return (
    <div className="shared-page">
      <p className="section-desc">Your account details.</p>

      <div className="settings-layout">
        <SettingsMenu />

        <section className="card">
          <div className="profile-head">
            <div className="avatar avatar-lg" aria-hidden="true"></div>
            <div className="profile-head-text">
              <h3 className="card-title">{displayName}</h3>
              <div className="profile-badges">
                <Badge color="green">{profile.roleLabel}</Badge>
                <Badge color="green">{profile.verification}</Badge>
              </div>
              <p className="sub-text">Member since {profile.memberSince}</p>
            </div>
            {!editing && (
              <Button small onClick={startEdit}>
                Edit profile
              </Button>
            )}
          </div>

          {saved && !editing && (
            <p className="notice" role="status">
              Saved for this demo only. Changes are not stored after you
              refresh.
            </p>
          )}

          {editing ? (
            <form onSubmit={handleSave}>
              <div className="form-grid profile-form">
                {draft.map((f) => (
                  <label
                    key={f.key}
                    className="field"
                    htmlFor={`profile-${f.key}`}
                  >
                    {f.label}
                    <input
                      id={`profile-${f.key}`}
                      className="text-input"
                      type="text"
                      value={f.value}
                      onChange={(e) => changeField(f.key, e.target.value)}
                    />
                  </label>
                ))}
              </div>
              <div className="button-row">
                <button type="submit" className="btn btn-solid">
                  Save
                </button>
                <Button onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </form>
          ) : (
            <dl className="detail-list">
              {fields.map((f) => (
                <div key={f.key} className="detail-row">
                  <dt className="sub-text">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;
