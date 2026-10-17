import { useState } from "react";
import Button from "../../components/Button.jsx";
import Pill from "../../components/Pill.jsx";
import Pagination from "../../components/Pagination.jsx";
import {
  moderationListings,
  moderationTabs,
} from "../../constants/adminData.js";
import "../../styles/admin.css";

function ListingModeration() {
  const [tab, setTab] = useState(moderationTabs[0]);
  const [search, setSearch] = useState("");

  // Every sample listing is "Pending". The tab label starts with its status name.
  const tabStatus = tab.split("(")[0];
  const visible = moderationListings.filter((listing) => {
    const matchesTab = listing.status === tabStatus;
    const text = (listing.title + " " + listing.seller).toLowerCase();
    return matchesTab && text.includes(search.trim().toLowerCase());
  });

  return (
    <div className="admin-page">
      <h2 className="section-title">Listing Moderation</h2>
      <p className="section-desc">
        Review, approve, remove, or flag seller listings before they go live or
        stay public.
      </p>

      <div className="pill-row">
        {moderationTabs.map((name) => (
          <Pill key={name} active={tab === name} onClick={() => setTab(name)}>
            {name}
          </Pill>
        ))}
      </div>

      <div className="filter-stack">
        <input
          className="text-input"
          type="text"
          placeholder="Search listing title or seller"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="select-wrap">
          <select className="select-input" defaultValue="">
            <option value="">All categories</option>
          </select>
        </div>
        <div className="select-wrap">
          <select className="select-input" defaultValue="">
            <option value="">All flag reasons</option>
          </select>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>LISTING</th>
              <th>SELLER</th>
              <th>PRICE</th>
              <th>SUBMITTED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((listing) => (
              <tr key={listing.title}>
                <td>
                  <div className="cell-with-image">
                    <div className="thumb"></div>
                    <span className="cell-strong">{listing.title}</span>
                  </div>
                </td>
                <td>{listing.seller}</td>
                <td className="cell-strong">{listing.price}</td>
                <td>{listing.submitted}</td>
                <td>
                  <div className="cell-actions">
                    <Button variant="solid" small upper>
                      ACCEPT
                    </Button>
                    <Button variant="danger" small upper>
                      REJECT
                    </Button>
                    <button
                      type="button"
                      className="icon-button"
                      aria-label="Preview"
                    >
                      ◉
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination />
    </div>
  );
}

export default ListingModeration;
