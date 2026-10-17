import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  faqs,
  helpCategories,
  helpGuides,
  systemStatus,
} from "../../constants/sharedData.js";
import "../../styles/shared.css";

function HelpCenter() {
  const { pathname } = useLocation();
  const base = pathname.startsWith("/seller/") ? "/seller" : "";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [openFaq, setOpenFaq] = useState("");
  const [openGuide, setOpenGuide] = useState("");

  const term = search.trim().toLowerCase();
  const visibleFaqs = term
    ? faqs.filter((f) =>
        `${f.question} ${f.answer}`.toLowerCase().includes(term),
      )
    : faqs;

  return (
    <div className="shared-page help-mock-page">
      <div className="help-title-row">
        <div>
          <h2 className="section-title">How can we help?</h2>
          <p className="section-desc">
            Search articles, or browse a category below. Need a human? Jump to
            Support Tickets.
          </p>
        </div>
        <input
          className="mock-input help-search"
          aria-label="Search help"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search FAQs, guides, or topics..."
        />
      </div>

      <div className="help-columns">
        <section>
          <h3 className="eyebrow">Browse by category</h3>
          <div className="help-category-grid">
            {helpCategories.map((name) => (
              <button
                key={name}
                type="button"
                className={
                  category === name ? "help-category active" : "help-category"
                }
                onClick={() => setCategory(category === name ? "" : name)}
              >
                {name}
              </button>
            ))}
          </div>

          <h3 className="eyebrow guides-heading">Getting started guides</h3>
          {helpGuides.map((guide, index) => (
            <button
              key={guide}
              type="button"
              className="guide-card"
              onClick={() => setOpenGuide(openGuide === guide ? "" : guide)}
            >
              <span>{index + 1}</span>
              <strong>{guide}</strong>
              {openGuide === guide && (
                <p>
                  Follow the steps in your account dashboard and save each
                  section before continuing.
                </p>
              )}
            </button>
          ))}
        </section>

        <section>
          <h3 className="eyebrow">Frequently asked</h3>
          <div className="help-faq-grid">
            {visibleFaqs.map((f) => (
              <button
                key={f.question}
                type="button"
                className="help-faq"
                onClick={() =>
                  setOpenFaq(openFaq === f.question ? "" : f.question)
                }
              >
                <strong>{f.question}</strong>
                {openFaq === f.question && <p>{f.answer}</p>}
              </button>
            ))}
            {visibleFaqs.length === 0 && (
              <p className="sub-text">
                No matching FAQs found. Try another keyword or submit a ticket.
              </p>
            )}
          </div>

          <h3 className="eyebrow system-heading">System status</h3>
          <div className="system-grid">
            <div className="mock-white-card system-status">
              {systemStatus.map((name) => (
                <div key={name}>
                  <span>{name}</span>
                  <strong>Operational</strong>
                </div>
              ))}
            </div>
            <div className="mock-white-card maintenance">
              <h3>Planned maintenance - (DATE)</h3>
              <p>Payouts may be delayed by a few hours during this window.</p>
              <div>
                (DATE) - Delayed order notifications <b>Resolved</b>
              </div>
              <div>
                (DATE) - Image upload errors <b>Resolved</b>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="help-bottom">
        <p>Didn't find what you needed? Submit a ticket or report a bug</p>
        <Link to={`${base}/support-tickets`} className="mock-btn solid">
          Go to Support Tickets
        </Link>
      </div>
    </div>
  );
}

export default HelpCenter;
