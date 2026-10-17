import { useState } from "react";
import Button from "../../components/Button.jsx";
import Pill from "../../components/Pill.jsx";
import StatCard from "../../components/StatCard.jsx";
import Badge from "../../components/Badge.jsx";
import Pagination from "../../components/Pagination.jsx";
import {
  caseStats,
  caseTabs,
  cases,
  severityColor,
} from "../../constants/adminData.js";
import "../../styles/admin.css";

// Which case type each tab shows ("All" shows everything).
const tabToType = {
  "All(28)": null,
  Disputes: "Dispute",
  Refunds: "Refund",
  "Trust & safety": "Trust & safety",
};

function ReportsDisputes() {
  const [tab, setTab] = useState(caseTabs[0]);

  const typeFilter = tabToType[tab];
  const visible = cases.filter(
    (item) => !typeFilter || item.type === typeFilter,
  );

  return (
    <div className="admin-page">
      <h2 className="section-title">Reports &amp; Disputes</h2>
      <p className="section-desc">
        Buyer-seller disputes, refund requests, and trust &amp; safety cases.
      </p>

      <div className="stat-grid">
        {caseStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      <div className="pill-row">
        {caseTabs.map((name) => (
          <Pill key={name} active={tab === name} onClick={() => setTab(name)}>
            {name}
          </Pill>
        ))}
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>CASE #</th>
              <th>SUBJECT</th>
              <th>PARTIES</th>
              <th>TYPE</th>
              <th>SEVERITY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((item, index) => (
              <tr key={index}>
                <td>{item.caseNumber}</td>
                <td>{item.subject}</td>
                <td>{item.parties}</td>
                <td>{item.type}</td>
                <td>
                  <Badge
                    color={severityColor[item.severity].replace("badge-", "")}
                  >
                    {item.severity}
                  </Badge>
                </td>
                <td>
                  <Button
                    small
                    block
                    title="Case details page has not been provided yet"
                  >
                    Open Case
                  </Button>
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

export default ReportsDisputes;
