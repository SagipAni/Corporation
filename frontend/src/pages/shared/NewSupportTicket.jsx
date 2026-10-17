import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ticketCategories, ticketKinds } from "../../constants/sharedData.js";
import "../../styles/shared.css";

function NewSupportTicket() {
  const [kind, setKind] = useState(ticketKinds[0]);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState(ticketCategories[0]);
  const [details, setDetails] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const base = pathname.startsWith("/seller/") ? "/seller" : "";
  function submit(event) {
    event.preventDefault();
    if (!subject.trim() || !details.trim()) {
      setError("Please enter a subject and details before submitting.");
      return;
    }
    setError("");
    setSent(true);
  }
  return (
    <div className="shared-page new-ticket-page">
      <h2 className="section-title">Start a new ticket</h2>
      <p className="section-desc">
        Covers support requests, bug reports, and feature requests - the type
        you pick routes it to the right team.
      </p>
      <div className="ticket-kind-row">
        {ticketKinds.map((k) => (
          <button
            type="button"
            key={k}
            onClick={() => setKind(k)}
            className={kind === k ? "mock-tab active" : "mock-tab"}
          >
            {k}
          </button>
        ))}
      </div>
      {sent ? (
        <section className="card ticket-done" role="status">
          <h3>Ticket prepared</h3>
          <p>
            Your {kind.toLowerCase()} “{subject}” is ready. This project preview
            does not connect to a live support server.
          </p>
          <div className="button-row">
            <button
              type="button"
              className="mock-btn solid"
              onClick={() => navigate(`${base}/support-tickets`)}
            >
              View my tickets
            </button>
            <button
              type="button"
              className="mock-btn"
              onClick={() => {
                setSent(false);
                setSubject("");
                setDetails("");
                setFiles([]);
              }}
            >
              Create another
            </button>
          </div>
        </section>
      ) : (
        <form className="new-ticket-grid" onSubmit={submit} noValidate>
          <div className="new-ticket-left">
            <label className="mock-label" htmlFor="new-ticket-subject">
              Subject
            </label>
            <input
              id="new-ticket-subject"
              className="mock-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Briefly describe the issue..."
            />
            <label className="mock-label" htmlFor="new-ticket-category">
              Category
            </label>
            <select
              id="new-ticket-category"
              className="mock-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {ticketCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="new-ticket-right">
            <label className="mock-label" htmlFor="new-ticket-details">
              Details
            </label>
            <textarea
              id="new-ticket-details"
              className="mock-input mock-textarea"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="What happened, what you expected, and steps to reproduce (for bugs)..."
            />
            <p className="mock-label upload-label">
              Attach screenshot or file <span>(optional)</span>
            </p>
            <label className="upload-tile">
              <input
                type="file"
                multiple
                accept="image/*,.pdf,.txt,.doc,.docx"
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />
              <strong>+ Add</strong>
            </label>
            {files.length > 0 && (
              <p className="upload-files">
                {files.map((f) => f.name).join(", ")}
              </p>
            )}
            <p className="sub-text upload-help">
              Screenshots help us diagnose bugs faster
            </p>
          </div>
          <div className="new-ticket-actions">
            <button type="submit" className="mock-btn solid">
              Submit Ticket
            </button>
            <Link className="mock-btn" to={`${base}/support-tickets`}>
              Cancel
            </Link>
            {error && (
              <p className="field-error" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
export default NewSupportTicket;
