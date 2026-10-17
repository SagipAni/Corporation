import { useState } from "react";
import Button from "../../components/Button.jsx";
import Pill from "../../components/Pill.jsx";
import StatCard from "../../components/StatCard.jsx";
import Badge from "../../components/Badge.jsx";
import ToggleRow from "../../components/ToggleRow.jsx";
import {
  priceStats,
  referencePrices,
  outOfRangeListings,
} from "../../constants/adminData.js";
import "../../styles/admin.css";

const tabs = ["Reference prices", "Out-of-range listings", "Sources"];

function PriceMonitoring() {
  const [tab, setTab] = useState(tabs[0]);
  const [flagAbove, setFlagAbove] = useState(true);
  const [flagBelow, setFlagBelow] = useState(false);

  return (
    <div className="admin-page">
      <h2 className="section-title">Price Monitoring</h2>
      <p className="section-desc">
        Set the reference prices per kilo and review listings priced outside the
        fair range.
      </p>

      <div className="pill-row" style={{ marginBottom: 0 }}>
        {tabs.map((name) => (
          <Pill key={name} active={tab === name} onClick={() => setTab(name)}>
            {name}
          </Pill>
        ))}
      </div>

      <div className="stat-grid">
        {priceStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>

      <section
        className="card card-section"
        style={{ padding: "26px 14px 14px" }}
      >
        <div className="row-between" style={{ padding: "0 20px 14px" }}>
          <p className="eyebrow">REFERENCE PRICES (PER KILO)</p>
          <Button variant="solid" small>
            + Add reference price
          </Button>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>DA PRICE (NCR)</th>
                <th>SELLER AVERAGE</th>
                <th>FAIR RANGE</th>
                <th>LAST UPDATED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {referencePrices.map((row) => (
                <tr key={row.product}>
                  <td>
                    <div className="cell-with-image">
                      <div
                        className="thumb"
                        style={{ width: 42, height: 42 }}
                      ></div>
                      <span className="cell-strong">{row.product}</span>
                    </div>
                  </td>
                  <td>{row.daPrice}</td>
                  <td>{row.sellerAverage}</td>
                  <td>{row.fairRange}</td>
                  <td className="sub-text">{row.lastUpdated}</td>
                  <td>
                    <Button small block>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="card card-section"
        style={{ padding: "26px 14px 14px" }}
      >
        <p className="eyebrow" style={{ padding: "0 20px 14px" }}>
          LISTINGS OUTSIDE THE FAIR RANGE
        </p>
        <div style={{ overflowX: "auto" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>LISTING</th>
                <th>SELLER</th>
                <th>PRICE</th>
                <th>MARKET PRICE</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {outOfRangeListings.map((row, index) => (
                <tr key={index}>
                  <td className="cell-strong">{row.listing}</td>
                  <td>{row.seller}</td>
                  <td className="cell-strong">{row.price}</td>
                  <td>{row.marketPrice}</td>
                  <td>
                    <Badge color="amber">{row.status}</Badge>
                  </td>
                  <td>
                    <div className="cell-actions">
                      <Button variant="solid" small>
                        Review
                      </Button>
                      <Button variant="danger" small>
                        Flag
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="price-bottom">
        <section className="card">
          <h3 className="card-heading">Fair range rule</h3>
          <ToggleRow
            plain
            title="Flag a listing when its price is more than (PERCENT) above the market price"
            checked={flagAbove}
            onChange={setFlagAbove}
          />
          <ToggleRow
            plain
            title="Flag a listing when its price is more than (PERCENT) below the market price"
            checked={flagBelow}
            onChange={setFlagBelow}
          />
        </section>
        <section className="sage-card">
          <h3 className="card-heading">Price source</h3>
          <p style={{ marginTop: 10, lineHeight: 1.5 }}>
            DA Bantay Presyo weekly average retail price per kilo in NCR
            markets, plus the average of active seller listings.
          </p>
        </section>
      </div>

      <div className="button-row">
        <Button variant="solid">Save changes</Button>
        <Button>Reset to default</Button>
      </div>
    </div>
  );
}

export default PriceMonitoring;
