import { useState } from "react";
import Button from "../../components/Button.jsx";
import Pill from "../../components/Pill.jsx";
import {
  supportTabs,
  systemStatus,
  statusSteps,
} from "../../constants/adminData.js";
import "../../styles/admin.css";

function SupportOversight() {
  const [tab, setTab] = useState("System Status");
  const [step, setStep] = useState(statusSteps[0]);

  function handleSubmit(event) {
    // Frontend-only for now: nothing is posted.
    event.preventDefault();
  }

  return (
    <div className="admin-page">
      <p style={{ margin: 0, fontSize: "1.5rem" }}>Admin</p>

      <div className="pill-row" style={{ marginTop: 18 }}>
        {supportTabs.map((name) => (
          <Pill key={name} active={tab === name} onClick={() => setTab(name)}>
            {name}
          </Pill>
        ))}
      </div>

      <h2 className="section-title">Support Oversight</h2>

      <section className="card support-top">
        <div
          className="row-between"
          style={{ paddingBottom: 18, borderBottom: "1px solid #e3eadf" }}
        >
          <div>
            <div className="card-heading">Manage help articles</div>
            <div className="sub-text">
              Edit, publish or unpublish the articles users see in Help.
            </div>
          </div>
          <Button small>New article</Button>
        </div>

        <h3
          className="card-title"
          style={{ margin: "24px 0 4px", fontFamily: "var(--font-body)" }}
        >
          Respond to tickets
        </h3>
        <p className="sub-text" style={{ marginBottom: 14 }}>
          Pick a ticket, then reply below
        </p>
        <div className="select-wrap">
          <select
            className="select-input"
            aria-label="Pick a ticket"
            defaultValue=""
          >
            <option value=""></option>
          </select>
        </div>
      </section>

      <div className="support-bottom">
        <section className="card">
          <h3 className="card-heading">Post system status updates</h3>
          {systemStatus.map((item) => (
            <div key={item.name} className="status-line">
              <span className="status-line-name">● {item.name}</span>
              <span className="sub-text">{item.state}</span>
            </div>
          ))}
        </section>

        <form className="card" onSubmit={handleSubmit}>
          <div className="form-block">
            <label className="big-label" htmlFor="statusTitle">
              Title
            </label>
            <input id="statusTitle" className="text-input" type="text" />
          </div>

          <div className="form-block">
            <p className="big-label">Status</p>
            <div className="pill-row" style={{ margin: 0 }}>
              {statusSteps.map((name) => (
                <Pill
                  key={name}
                  active={step === name}
                  onClick={() => setStep(name)}
                >
                  {name}
                </Pill>
              ))}
            </div>
          </div>

          <div className="form-block">
            <label className="big-label" htmlFor="statusMessage">
              Message
            </label>
            <textarea
              id="statusMessage"
              className="textarea-input"
              placeholder="What is the affected and what user should expect?"
            ></textarea>
          </div>

          <div className="button-row" style={{ justifyContent: "flex-end" }}>
            <button type="submit" className="btn btn-solid btn-upper">
              POST UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SupportOversight;
