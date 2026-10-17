import { useState } from "react";
import Button from "../../components/Button.jsx";
import Pill from "../../components/Pill.jsx";
import { initialNotifications } from "../../constants/sharedData.js";
import "../../styles/shared.css";

function Inbox() {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState("All");

  const unreadCount = items.filter((n) => n.unread).length;
  const visible = filter === "Unread" ? items.filter((n) => n.unread) : items;

  function markRead(id) {
    setItems((list) =>
      list.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    );
  }

  function markAllRead() {
    setItems((list) => list.map((n) => ({ ...n, unread: false })));
  }

  return (
    <div className="shared-page">
      <div className="row-between">
        <div>
          <p className="section-desc">
            {unreadCount} unread{" "}
            {unreadCount === 1 ? "notification" : "notifications"}
          </p>
        </div>
        <Button small onClick={markAllRead} disabled={unreadCount === 0}>
          Mark all as read
        </Button>
      </div>

      <div className="pill-row">
        {["All", "Unread"].map((name) => (
          <Pill
            key={name}
            active={filter === name}
            onClick={() => setFilter(name)}
          >
            {name}
          </Pill>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="card empty-state">
          <h3 className="card-heading">
            {filter === "Unread"
              ? "You are all caught up"
              : "No notifications yet"}
          </h3>
          <p className="sub-text">
            {filter === "Unread"
              ? "There are no unread notifications."
              : "New alerts will show up here."}
          </p>
        </div>
      ) : (
        <ul className="inbox-list">
          {visible.map((n) => (
            <li
              key={n.id}
              className={
                n.unread ? "inbox-item inbox-item-unread" : "inbox-item"
              }
            >
              <span
                className={
                  n.unread ? "unread-dot" : "unread-dot unread-dot-off"
                }
                aria-label={n.unread ? "Unread" : "Read"}
              ></span>
              <div className="inbox-text">
                <div className="list-item-title">{n.title}</div>
                <div className="list-item-detail">{n.body}</div>
                <div className="sub-text inbox-time">{n.time}</div>
              </div>
              {n.unread && (
                <Button small onClick={() => markRead(n.id)}>
                  Mark as read
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Inbox;
