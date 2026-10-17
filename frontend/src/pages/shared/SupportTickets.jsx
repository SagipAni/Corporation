import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { supportTickets, ticketFilters } from "../../constants/sharedData.js";
import "../../styles/shared.css";

function SupportTickets() {
  const { pathname } = useLocation();
  const base = pathname.startsWith("/seller/") ? "/seller" : "";

  const [tickets, setTickets] = useState(supportTickets);
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(supportTickets[0].id);
  const [reply, setReply] = useState("");

  const current = tickets.find((t) => t.id === selectedId) || tickets[0];
  const visible = tickets.filter(
    (t) => filter === "All" || t.status === filter,
  );

  function sendReply(event) {
    event.preventDefault();
    const text = reply.trim();
    if (!text) return;

    setTickets((list) =>
      list.map((t) =>
        t.id === current.id
          ? {
              ...t,
              status: "In progress",
              messages: [...t.messages, { from: "You", text }],
            }
          : t,
      ),
    );
    setReply("");
  }

  return (
    <div className="shared-page mock-ticket-page">
      <div className="mock-ticket-top">
        <div className="mock-ticket-tabs">
          <Link className="mock-tab active" to={`${base}/support-tickets`}>
            My Tickets
          </Link>
          <Link className="mock-tab" to={`${base}/support-tickets/new`}>
            New Ticket
          </Link>
        </div>
      </div>

      <div className="ticket-workspace">
        <section className="ticket-list-panel">
          <div className="ticket-filters">
            {ticketFilters.map((name) => (
              <button
                key={name}
                type="button"
                className={filter === name ? "mock-tab active" : "mock-tab"}
                onClick={() => setFilter(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {visible.map((t) => (
            <button
              key={t.id}
              type="button"
              className={
                current.id === t.id
                  ? "ticket-list-item chosen"
                  : "ticket-list-item"
              }
              onClick={() => setSelectedId(t.id)}
            >
              <strong>{t.subject}</strong>
              <span className="ticket-status">{t.status}</span>
            </button>
          ))}
          {visible.length === 0 && (
            <p className="sub-text">No tickets in this status.</p>
          )}
        </section>

        <section className="ticket-chat-panel">
          <div className="ticket-chat-date">
            {current.date} · {current.id}
          </div>
          <div className="ticket-chat-messages">
            {current.messages.map((m, index) => (
              <div
                key={index}
                className={
                  m.from === "You" ? "chat-bubble mine" : "chat-bubble"
                }
              >
                <small>{m.from}</small>
                <p>{m.text}</p>
              </div>
            ))}
          </div>
          <form className="ticket-reply" onSubmit={sendReply}>
            <input
              aria-label="Write a reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a reply..."
            />
            <button aria-label="Send reply" type="submit">
              ➤
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default SupportTickets;
