import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  crops,
  messages,
  money,
  orders as initialOrders,
  products,
  stockTone,
  isLowStock,
  LOW_STOCK_LIMIT,
} from "../../constants/sellerData.js";
import Button from "../../components/Button.jsx";
import "../../styles/seller.css";

const initials = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

function Page({ subtitle, actions, children }) {
  return (
    <div className="seller-page">
      <div className="seller-page-heading">
        <div>{subtitle && <p className="seller-muted">{subtitle}</p>}</div>
        <div className="seller-actions">{actions}</div>
      </div>
      {children}
    </div>
  );
}
function Card({ title, children, className = "" }) {
  return (
    <section className={`seller-card ${className}`}>
      {title && <h3>{title}</h3>}
      {children}
    </section>
  );
}
function Chip({ children, tone = "" }) {
  return <span className={`seller-chip ${tone}`}>{children}</span>;
}
function ProductTable({ rows = products, actions = true }) {
  return (
    <div className="seller-table-wrap">
      <table className="seller-table">
        <thead>
          <tr>
            <th>Listing</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            {actions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={actions ? 6 : 5} className="seller-muted">
                No listings found.
              </td>
            </tr>
          )}
          {rows.map((p) => (
            <tr key={p.id}>
              <td>
                <strong>{p.name}</strong>
                <small>Harvest: {p.harvest}</small>
              </td>
              <td>{p.category}</td>
              <td>
                {money(p.price)}/{p.unit}
              </td>
              <td>
                {p.quantity} {p.unit}
              </td>
              <td>
                <Chip tone={stockTone(p.quantity)}>{p.status}</Chip>
              </td>
              {actions && (
                <td>
                  <Link className="seller-text-link" to="/seller/listings/new">
                    Edit
                  </Link>{" "}
                  <Link
                    className="seller-text-link"
                    to="/seller/listings/performance"
                  >
                    Performance
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function SellerDashboard() {
  const pending = initialOrders.filter(
    (o) => o.status === "New" || o.status === "Processing",
  );
  return (
    <Page
      subtitle="SALES SUMMARY · TODAY / WEEK / MONTH"
      actions={
        <Button to="/seller/orders" variant="outline">
          View orders
        </Button>
      }
    >
      <div className="seller-stats">
        {[
          { label: "Today", value: money(1250), hint: "10 orders" },
          { label: "This week", value: money(7850), hint: "50 orders" },
          { label: "This month", value: money(28400), hint: "160 orders" },
        ].map((s) => (
          <Card key={s.label}>
            <span className="seller-eyebrow">
              {s.label} · {s.hint}
            </span>
            <strong className="seller-stat-value">{s.value}</strong>
          </Card>
        ))}
      </div>
      <div className="seller-grid two">
        <Card title="Pending orders">
          <div className="seller-list">
            {pending.map((o) => (
              <div className="seller-list-row" key={o.id}>
                <div>
                  <strong>Order #{o.id}</strong>
                  <small>
                    {o.items} · {o.buyer}
                  </small>
                </div>
                <Chip>{o.status}</Chip>
                <Button to="/seller/orders" small variant="solid">
                  Fulfill
                </Button>
              </div>
            ))}
          </div>
          <p className="seller-right">
            <Link to="/seller/orders" className="seller-text-link">
              View all orders →
            </Link>
          </p>
        </Card>
        <Card title="Inventory alerts">
          <div className="seller-list">
            {products
              .filter((p) => p.quantity < LOW_STOCK_LIMIT)
              .map((p) => (
                <div className="seller-list-row" key={p.id}>
                  <strong>{p.name}</strong>
                  <Chip tone={p.quantity === 0 ? "danger" : "warning"}>
                    {p.quantity === 0 ? "Out of stock" : `${p.quantity} left`}
                  </Chip>
                </div>
              ))}
          </div>
        </Card>
      </div>
      <div className="seller-grid two">
        <Card title="Revenue / earnings">
          <div className="seller-bars">
            {[64, 42, 56, 32, 18, 63, 48].map((h, i) => (
              <div
                key={i}
                style={{ height: `${h}%` }}
                title={`Period ${i + 1}`}
              />
            ))}
          </div>
          <div className="seller-muted">Weekly sales overview</div>
        </Card>
        <Card title="Top-performing products">
          <ol className="seller-ranking">
            {[...products]
              .sort((a, b) => b.orders - a.orders)
              .slice(0, 3)
              .map((p) => (
                <li key={p.id}>
                  {p.name}
                  <strong>{p.orders} orders</strong>
                </li>
              ))}
          </ol>
        </Card>
      </div>
      <div className="seller-grid two">
        <Card title="Recent buyer engagement">
          {messages.slice(0, 2).map((m) => (
            <div className="seller-list-row" key={m.name}>
              <span>
                {m.name}: “{m.text}”
              </span>
              <span className="seller-muted">{m.time}</span>
            </div>
          ))}
          <p className="seller-right">
            <Link to="/seller/messages" className="seller-text-link">
              Open messages →
            </Link>
          </p>
        </Card>
        <Card title="Seller rating">
          <strong className="seller-stat-value">4.7 / 5</strong>
          <p className="seller-muted">Based on 200 buyer reviews</p>
        </Card>
      </div>
    </Page>
  );
}
export function SellerOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(initialOrders[0].id);
  const [fulfilledId, setFulfilledId] = useState(null);

  const visible = orders.filter((o) => filter === "All" || o.status === filter);
  const order = orders.find((o) => o.id === selectedId) || orders[0];
  const isFulfilled = order.status === "Fulfilled";

  function markFulfilled() {
    setOrders((list) =>
      list.map((o) => (o.id === order.id ? { ...o, status: "Fulfilled" } : o)),
    );
    setFulfilledId(order.id);
  }

  return (
    <Page subtitle="Manage, prepare, and fulfill buyer orders">
      <div className="seller-tabs">
        {["All", "New", "Processing", "Fulfilled"].map((f) => (
          <button
            key={f}
            type="button"
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f} (
            {f === "All"
              ? orders.length
              : orders.filter((o) => o.status === f).length}
            )
          </button>
        ))}
      </div>
      <div className="seller-grid order-layout">
        <Card title="Order list">
          <div className="seller-list">
            {visible.map((o) => (
              <button
                key={o.id}
                type="button"
                className={`seller-order-pick ${order.id === o.id ? "selected" : ""}`}
                onClick={() => setSelectedId(o.id)}
              >
                <span>
                  <strong>
                    #{o.id} · {o.buyer}
                  </strong>
                  <small>{o.items}</small>
                </span>
                <Chip>{o.status}</Chip>
              </button>
            ))}
          </div>
        </Card>
        <div className="seller-stack">
          <Card title={`Order #${order.id}`}>
            <div className="seller-detail-grid">
              <div>
                <small>BUYER</small>
                <strong>{order.buyer}</strong>
              </div>
              <div>
                <small>ORDER DATE</small>
                <strong>{order.date}</strong>
              </div>
              <div>
                <small>PAYMENT STATUS</small>
                <strong>Paid · Online payment</strong>
              </div>
              <div>
                <small>FULFILLMENT</small>
                <strong>{order.fulfillment}</strong>
              </div>
            </div>
            <h4>Items</h4>
            <p>{order.items}</p>
            <div className="seller-total">
              <span>Total</span>
              <strong>{money(order.total)}</strong>
            </div>
            <div className="seller-actions">
              <Button onClick={() => window.print()}>Print package slip</Button>
              <Button
                variant="solid"
                disabled={isFulfilled}
                onClick={markFulfilled}
              >
                {isFulfilled ? "Marked fulfilled" : "Accept & fulfill"}
              </Button>
            </div>
            {fulfilledId === order.id && (
              <p className="seller-notice">
                Order marked fulfilled for this session.
              </p>
            )}
          </Card>
          <Card title="Buyer note">
            <p>“Please keep the produce fresh. Thank you!”</p>
            <Button to="/seller/messages">Message buyer</Button>
          </Card>
        </div>
      </div>
    </Page>
  );
}

const planViews = ["Timeline", "Card view", "List"];

export function FarmPlanning() {
  const [view, setView] = useState("Timeline");
  const [showForm, setShowForm] = useState(false);
  const [cropName, setCropName] = useState("");
  const [cropList, setCropList] = useState(crops);

  function addCrop(event) {
    event.preventDefault();
    const name = cropName.trim();
    if (!name) return;

    setCropList((list) => [
      ...list,
      {
        id: Date.now(),
        name,
        status: "Planned",
        planted: "Not set",
        harvest: "Not set",
        yield: "Not set",
      },
    ]);
    setCropName("");
    setShowForm(false);
  }

  return (
    <Page
      subtitle="Planting & harvest plan"
      actions={
        <>
          <Button onClick={() => window.print()}>Export plan</Button>
          <Button variant="solid" onClick={() => setShowForm((open) => !open)}>
            + Plan new crop
          </Button>
        </>
      }
    >
      <div className="seller-tabs">
        {planViews.map((v) => (
          <button
            key={v}
            type="button"
            className={view === v ? "active" : ""}
            onClick={() => setView(v)}
          >
            {v}
          </button>
        ))}
      </div>

      {showForm && (
        <Card title="Plan a crop">
          <form className="seller-form inline" onSubmit={addCrop}>
            <label>
              Crop or product
              <input
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                required
                placeholder="e.g. Bitter gourd"
              />
            </label>
            <Button variant="solid" type="submit">
              Save plan
            </Button>
          </form>
        </Card>
      )}

      {view === "Timeline" && (
        <Card title="Planting & harvest timeline">
          <div className="seller-timeline">
            <div className="seller-months">
              {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
                <span key={m}>{m} 2026</span>
              ))}
            </div>
            {cropList.map((c, i) => (
              <div className="seller-crop-row" key={c.id}>
                <strong>{c.name}</strong>
                <div className="seller-timeline-track">
                  <span style={{ left: `${i * 13}%`, width: "32%" }} />
                </div>
                <Chip>{c.status}</Chip>
              </div>
            ))}
          </div>
        </Card>
      )}

      {view === "List" ? (
        <Card title="Crop plan list">
          <div className="seller-table-wrap">
            <table className="seller-table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Status</th>
                  <th>Planted</th>
                  <th>Expected harvest</th>
                  <th>Estimated yield</th>
                </tr>
              </thead>
              <tbody>
                {cropList.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <strong>{c.name}</strong>
                    </td>
                    <td>
                      <Chip>{c.status}</Chip>
                    </td>
                    <td>{c.planted}</td>
                    <td>{c.harvest}</td>
                    <td>{c.yield}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="seller-grid two">
          {cropList.map((c) => (
            <Card key={c.id}>
              <div className="seller-card-title">
                <h3>{c.name}</h3>
                <Chip>{c.status}</Chip>
              </div>
              <div className="seller-list-row">
                <span>Planted</span>
                <strong>{c.planted}</strong>
              </div>
              <div className="seller-list-row">
                <span>Expected harvest</span>
                <strong>{c.harvest}</strong>
              </div>
              <div className="seller-list-row">
                <span>Estimated yield</span>
                <strong>{c.yield}</strong>
              </div>
              <Link to="/seller/listings/new" className="seller-text-link">
                Create listing when ready →
              </Link>
            </Card>
          ))}
        </div>
      )}
    </Page>
  );
}

export function InventoryPricing() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState(products[0].id);
  const [prices, setPrices] = useState(
    Object.fromEntries(products.map((p) => [p.id, p.price])),
  );

  const editing = products.find((p) => p.id === editingId);
  const rows = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (filter === "All" ||
        (filter === "Low stock" && isLowStock(p.quantity)) ||
        (filter === "Out of stock" && p.quantity === 0)),
  );

  function changePrice(id, value) {
    setPrices((v) => ({ ...v, [id]: Number(value) }));
  }

  return (
    <Page
      subtitle={`${products.length} products · ${products.filter((p) => isLowStock(p.quantity)).length} low stock · ${products.filter((p) => p.quantity === 0).length} out of stock`}
      actions={
        <Button to="/seller/listings/new" variant="solid">
          + Add product
        </Button>
      }
    >
      <div className="seller-toolbar">
        <input
          aria-label="Search products"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="seller-tabs">
          {["All", "Low stock", "Out of stock"].map((f) => (
            <button
              key={f}
              type="button"
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <Card>
        <div className="seller-table-wrap">
          <table className="seller-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty avail.</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id}>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td>{p.quantity}</td>
                  <td>
                    {editingId === p.id ? (
                      <input
                        className="seller-cell-input"
                        type="number"
                        min="1"
                        aria-label={`Price for ${p.name}`}
                        value={prices[p.id]}
                        onChange={(e) => changePrice(p.id, e.target.value)}
                      />
                    ) : (
                      money(prices[p.id])
                    )}
                  </td>
                  <td>{p.unit}</td>
                  <td>
                    <Chip tone={stockTone(p.quantity)}>{p.status}</Chip>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="seller-text-link"
                      onClick={() =>
                        setEditingId(editingId === p.id ? null : p.id)
                      }
                    >
                      {editingId === p.id ? "Save price" : "Edit pricing"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card title={`Set pricing — ${editing?.name || "Choose a product"}`}>
        <p className="seller-muted">
          Set your price and optional bulk discounts. Price updates here are a
          local preview until connected to the backend.
        </p>
        <div className="seller-form inline">
          <label>
            Price (₱)
            <input
              type="number"
              min="1"
              disabled={!editing}
              value={editing ? prices[editing.id] : ""}
              onChange={(e) => changePrice(editing.id, e.target.value)}
            />
          </label>
          <label>
            Unit
            <select
              key={editingId}
              disabled={!editing}
              defaultValue={editing?.unit ?? "kg"}
            >
              <option>kg</option>
              <option>bundle</option>
              <option>piece</option>
              <option>crate</option>
            </select>
          </label>
        </div>
        <Button
          variant="solid"
          disabled={!editing}
          onClick={() => setEditingId(null)}
        >
          Save pricing
        </Button>
      </Card>
    </Page>
  );
}

export function PriceComparison() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All vegetables");

  const rows = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (category === "All vegetables" || p.category === category),
  );

  return (
    <Page subtitle="See what other sellers and the market charge per kilo before you set your price.">
      <div className="seller-toolbar">
        <input
          aria-label="Search product"
          placeholder="Search product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select
          aria-label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All vegetables</option>
          <option>Leafy greens</option>
        </select>
        <select aria-label="Region" defaultValue="Rizal">
          <option>Rizal</option>
          <option>Metro Manila</option>
          <option>Laguna</option>
        </select>
      </div>
      <div className="seller-stats four">
        {[
          { label: "Your price", value: money(85) + "/kg" },
          { label: "Lowest price", value: money(70) + "/kg" },
          { label: "Average price", value: money(82) + "/kg" },
          { label: "Highest price", value: money(100) + "/kg" },
        ].map((s) => (
          <Card key={s.label}>
            <span className="seller-muted">{s.label}</span>
            <strong className="seller-stat-value">{s.value}</strong>
          </Card>
        ))}
      </div>
      <Card>
        <div className="seller-table-wrap">
          <table className="seller-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Your price</th>
                <th>Other sellers</th>
                <th>DA market price</th>
                <th>Comparison</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => {
                // Sample data: only the first product is shown as above average.
                const aboveAverage = p.id === products[0].id;
                return (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.name}</strong>
                    </td>
                    <td>
                      {money(p.price)}/{p.unit}
                    </td>
                    <td>
                      <div className="seller-price-track">
                        <span style={{ left: `${25 + i * 15}%` }} />
                      </div>
                      <small>
                        {money(p.price - 10)} – {money(p.price + 15)} per{" "}
                        {p.unit}
                      </small>
                    </td>
                    <td>
                      {money(p.price + 3)}/{p.unit}
                    </td>
                    <td>
                      <Chip tone={aboveAverage ? "warning" : "success"}>
                        {aboveAverage ? "Above average" : "In range"}
                      </Chip>
                    </td>
                    <td>
                      <Link to="/seller/inventory" className="seller-text-link">
                        Update price
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <Card title="Where the prices come from">
        <div className="seller-list">
          <div className="seller-list-row">
            <div>
              <strong>Other sellers on Sagip Ani</strong>
              <small>Active listings of the same product</small>
            </div>
            <span className="seller-muted">Updated today</span>
          </div>
          <div className="seller-list-row">
            <div>
              <strong>DA Bantay Presyo</strong>
              <small>Indicative retail market prices</small>
            </div>
            <span className="seller-muted">Sample data</span>
          </div>
          <div className="seller-list-row">
            <div>
              <strong>Local palengke survey</strong>
              <small>Illustrative prices for UI preview</small>
            </div>
            <span className="seller-muted">Sample data</span>
          </div>
        </div>
      </Card>
    </Page>
  );
}

export function MyListings() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("Active");
  const [query, setQuery] = useState("");

  const rows = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) &&
      (filter === "Active"
        ? p.quantity > 0
        : filter === "Sold out"
          ? p.quantity === 0
          : p.status === "Draft"),
  );

  return (
    <Page
      subtitle="Manage your products and availability"
      actions={
        <Button to="/seller/listings/new" variant="solid">
          + Add new listing
        </Button>
      }
    >
      <div className="seller-tabs">
        {["Browse", "My Listings", "Orders"].map((t) => (
          <button
            key={t}
            type="button"
            className={t === "My Listings" ? "active" : ""}
            disabled={t === "Browse"}
            onClick={() => t === "Orders" && navigate("/seller/orders")}
          >
            {t}
            {t === "Browse" ? " · Coming soon" : ""}
          </button>
        ))}
      </div>
      <div className="seller-page-heading">
        <h3>My Listings</h3>
      </div>
      <div className="seller-toolbar">
        <div className="seller-tabs">
          {["Active", "Sold out", "Draft / inactive"].map((f) => (
            <button
              key={f}
              type="button"
              className={filter === f ? "active" : ""}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          aria-label="Search my listings"
          placeholder="Search my listings..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Card>
        <ProductTable rows={rows} />
      </Card>
    </Page>
  );
}

export function AddListing() {
  const [form, setForm] = useState({
    name: "",
    category: "Vegetables",
    description: "",
    price: "",
    unit: "kg",
    quantity: "",
    harvest: "",
    until: "",
    visibility: "Public",
  });
  const [saved, setSaved] = useState(false);
  const update = (e) =>
    setForm((v) => ({ ...v, [e.target.name]: e.target.value }));
  return (
    <Page subtitle="Share your fresh produce with buyers">
      <form
        className="seller-card seller-listing-form"
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
      >
        <div className="seller-form-column">
          <label>
            Photos
            <div className="seller-photo-place">
              <span>+ Add photos</span>
            </div>
          </label>
          <label>
            Product name
            <input
              name="name"
              value={form.name}
              onChange={update}
              required
              placeholder="e.g. Heirloom Tomatoes"
            />
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={update}>
              <option>Vegetables</option>
              <option>Fruits</option>
              <option>Grains</option>
              <option>Herbs</option>
              <option>Root crops</option>
            </select>
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={update}
              rows="5"
              placeholder="Describe your produce, growing practices, and quality..."
            />
          </label>
        </div>
        <div className="seller-form-column">
          <div className="seller-form inline">
            <label>
              Price (₱)
              <input
                name="price"
                type="number"
                min="1"
                value={form.price}
                onChange={update}
                required
              />
            </label>
            <label>
              Unit
              <select name="unit" value={form.unit} onChange={update}>
                <option>kg</option>
                <option>bundle</option>
                <option>piece</option>
                <option>crate</option>
              </select>
            </label>
          </div>
          <label>
            Quantity available
            <input
              name="quantity"
              type="number"
              min="0"
              value={form.quantity}
              onChange={update}
              required
            />
          </label>
          <div className="seller-form inline">
            <label>
              Harvest / ready date
              <input
                name="harvest"
                type="date"
                value={form.harvest}
                onChange={update}
              />
            </label>
            <label>
              Available until
              <input
                name="until"
                type="date"
                value={form.until}
                onChange={update}
              />
            </label>
          </div>
          <label>
            Visibility
            <select name="visibility" value={form.visibility} onChange={update}>
              <option>Public</option>
              <option>Unlisted</option>
              <option>Draft</option>
            </select>
          </label>
        </div>
        <div className="seller-form-actions">
          <Button variant="solid" type="submit">
            Publish listing
          </Button>
          <Button onClick={() => setSaved(true)}>Save changes</Button>
          <Button to="/seller/listings">Cancel</Button>
        </div>
        {saved && (
          <p className="seller-notice">
            {form.name
              ? `${form.name} saved as a local preview.`
              : "Draft saved as a local preview."}{" "}
            Connect the backend to publish permanently.
          </p>
        )}
      </form>
    </Page>
  );
}
export function ListingPerformance() {
  const [range, setRange] = useState("Last 30 days");
  const metrics = [
    { label: "Listing views", value: "1,284", change: "↑ 12%" },
    { label: "Buyer inquiries", value: "86", change: "↑ 8%" },
    { label: "Orders", value: "43", change: "↑ 16%" },
    { label: "Conversion rate", value: "3.4%", change: "↑ 0.5%" },
  ];
  return (
    <Page
      subtitle="Performance — Your farm business"
      actions={
        <select value={range} onChange={(e) => setRange(e.target.value)}>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      }
    >
      <div className="seller-stats four">
        {metrics.map((m) => (
          <Card key={m.label}>
            <span className="seller-muted">{m.label}</span>
            <strong className="seller-stat-value">{m.value}</strong>
            <Chip tone="success">{m.change}</Chip>
          </Card>
        ))}
      </div>
      <Card title="Views and orders over time">
        <div className="seller-chart">
          {[55, 76, 34, 62, 48, 71, 28, 64].map((h, i) => (
            <div className="seller-chart-column" key={i}>
              <span style={{ height: `${h}%` }} />
              <small>W{i + 1}</small>
            </div>
          ))}
        </div>
        <div className="seller-legend">
          <span>● Views</span>
          <span>■ Orders</span>
        </div>
      </Card>
      <Card title="Daily performance">
        <div className="seller-table-wrap">
          <table className="seller-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Views</th>
                <th>Inquiries</th>
                <th>Orders</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Oct 12, 2026",
                "Oct 11, 2026",
                "Oct 10, 2026",
                "Oct 9, 2026",
              ].map((d, i) => (
                <tr key={d}>
                  <td>{d}</td>
                  <td>{142 - i * 17}</td>
                  <td>{12 - i * 2}</td>
                  <td>{7 - i}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Page>
  );
}
export function SellerMessages() {
  const [active, setActive] = useState(messages[0].name);
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState([]);
  const current = messages.find((m) => m.name === active) || messages[0];
  return (
    <Page subtitle="Communicate directly with your buyers">
      <div className="seller-grid message-layout">
        <Card title="Conversations">
          <div className="seller-list">
            {messages.map((m) => (
              <button
                key={m.name}
                className={`seller-message-pick ${active === m.name ? "selected" : ""}`}
                onClick={() => setActive(m.name)}
              >
                <span className="seller-avatar">{initials(m.name)}</span>
                <span>
                  <strong>{m.name}</strong>
                  <small>{m.text}</small>
                </span>
                <small>{m.time}</small>
              </button>
            ))}
          </div>
        </Card>
        <Card className="seller-chat">
          <div className="seller-chat-heading">
            <span className="seller-avatar">{initials(current.name)}</span>
            <div>
              <strong>{current.name}</strong>
              <small>Buyer · Sagip Ani</small>
            </div>
          </div>
          <div className="seller-chat-body">
            <div className="seller-bubble incoming">
              {current.text}
              <small>{current.time}</small>
            </div>
            {sent
              .filter((m) => m.to === active)
              .map((m, i) => (
                <div className="seller-bubble outgoing" key={i}>
                  {m.text}
                  <small>Just now</small>
                </div>
              ))}
          </div>
          <form
            className="seller-reply"
            onSubmit={(e) => {
              e.preventDefault();
              if (reply.trim()) {
                setSent((v) => [...v, { to: active, text: reply.trim() }]);
                setReply("");
              }
            }}
          >
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Write a reply..."
            />
            <button type="submit" aria-label="Send message">
              ➤
            </button>
          </form>
          <p className="seller-muted">
            Messages are a local UI preview and are not sent to a real buyer.
          </p>
        </Card>
      </div>
    </Page>
  );
}
export function SellerDetails() {
  const [values, setValues] = useState({
    business: "",
    location: "",
    registration: "",
    description: "",
  });
  const [docs, setDocs] = useState({ id: "", permit: "", proof: "" });
  const [saved, setSaved] = useState(false);
  const [categories, setCategories] = useState([
    "Vegetables",
    "Fruits",
    "Grains",
  ]);
  const [payout, setPayout] = useState("BANK");
  return (
    <div className="seller-specific-page">
      <div className="seller-specific-main">
        <h2 className="section-title">UPDATE DETAILS / SELLER-SPECIFIC</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSaved(true);
          }}
        >
          <div className="seller-specific-fields">
            <label>
              FARM / BUSINESS NAME
              <input
                value={values.business}
                onChange={(e) =>
                  setValues((v) => ({ ...v, business: e.target.value }))
                }
                required
              />
            </label>
            <label>
              FARM / BUSINESS LOCATION
              <input
                value={values.location}
                onChange={(e) =>
                  setValues((v) => ({ ...v, location: e.target.value }))
                }
                required
              />
            </label>
          </div>
          <div className="map-placeholder">(MAP PIN PLACEHOLDER)</div>
          <p className="eyebrow seller-eyebrow">
            BUSINESS REGISTRATION &amp; VERIFICATION
          </p>
          <section className="seller-specific-card">
            <label>
              BUSINESS REGISTRATION NUMBER (OPTIONAL FOR INDIVIDUAL SELLERS)
              <input
                placeholder="E.G DTI / BIR REGISTRATION NO."
                value={values.registration}
                onChange={(e) =>
                  setValues((v) => ({ ...v, registration: e.target.value }))
                }
              />
            </label>
            <p className="seller-upload-title">UPLOAD VERIFICATION DOCUMENTS</p>
            <div className="seller-doc-grid">
              {[
                { key: "id", title: "GOV'T ID UPLOAD" },
                { key: "permit", title: "BUSINESS PERMIT + UPLOAD" },
                { key: "proof", title: "PROOF OF FARM / ADDRESS + UPLOAD" },
              ].map((d) => (
                <label className="seller-doc-tile" key={d.key}>
                  {docs[d.key] || d.title}
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      setDocs((old) => ({
                        ...old,
                        [d.key]: e.target.files?.[0]?.name || "",
                      }))
                    }
                  />
                </label>
              ))}
            </div>
            <div className="seller-verification-status">
              <span>IDENTITY: SUBMITTED</span>
              <span>BUSINESS: NOT SUBMITTED</span>
              <span>FARM VERIFIED: PENDING</span>
            </div>
          </section>
          <p className="eyebrow seller-eyebrow">BANK / PAYOUT DETAILS</p>
          <section className="seller-specific-card payout-card">
            {["BANK", "GCASH"].map((x) => (
              <div className="payout-row" key={x}>
                <button
                  type="button"
                  className={payout === x ? "mock-tab active" : "mock-tab"}
                  onClick={() => setPayout(x)}
                >
                  {x}
                </button>
                <span>(INFORMATION)</span>
                <button
                  type="button"
                  className="text-action"
                  onClick={() => setPayout(x)}
                >
                  EDIT
                </button>
              </div>
            ))}
          </section>
          <p className="eyebrow seller-eyebrow">PRODUCT CATEGORIES YOU SELL</p>
          <div className="seller-category-row">
            {categories.map((c) => (
              <button
                type="button"
                className="mock-tab"
                key={c}
                onClick={() =>
                  setCategories((old) => old.filter((x) => x !== c))
                }
              >
                {c.toUpperCase()} ×
              </button>
            ))}
            <button
              type="button"
              className="mock-tab"
              onClick={() =>
                setCategories((old) =>
                  old.includes("Other") ? old : [...old, "Other"],
                )
              }
            >
              + OTHER
            </button>
          </div>
          <label className="seller-bio-label">
            BUSINESS DESCRIPTION / BIO
            <textarea
              rows="4"
              placeholder="SHOW ON YOUR PUBLIC SHOP PAGE IN MARKET."
              value={values.description}
              onChange={(e) =>
                setValues((v) => ({ ...v, description: e.target.value }))
              }
            />
          </label>
          <div className="seller-specific-actions">
            <button className="mock-btn solid" type="submit">
              SAVE CHANGES
            </button>
            <Link className="mock-btn" to="/profile">
              CANCEL
            </Link>
          </div>
          {saved && (
            <p className="seller-notice" role="status">
              Changes saved in this page preview. They are not sent to a server.
            </p>
          )}
        </form>
      </div>
      <aside className="seller-preview">
        <p className="eyebrow">BUYER-FACING PREVIEW</p>
        <div className="seller-preview-head">
          <span>
            FARMERS
            <br />
            LOGO
          </span>
          <div>
            <strong>{values.business || "(FARM / BUSINESS NAME)"}</strong>
            <p>{values.location || "(FARM / BUSINESS LOCATION)"}</p>
            <small>★ 4.7 (213)</small>
          </div>
        </div>
        <div className="seller-preview-products">
          {[1, 2, 3, 4].map((n) => (
            <span key={n}>(PRODUCT NAME)</span>
          ))}
        </div>
      </aside>
    </div>
  );
}
