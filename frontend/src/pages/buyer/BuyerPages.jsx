import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Tomatoes (Kamatis)",
    price: 48,
    seller: "Green Valley Farm",
    location: "Tanay, Rizal",
    rating: 4.8,
    unit: "kg",
  },
  {
    id: 2,
    name: "Eggplant (Talong)",
    price: 36,
    seller: "Buhay Bukid",
    location: "Cainta, Rizal",
    rating: 4.6,
    unit: "kg",
  },
  {
    id: 3,
    name: "Kangkong",
    price: 22,
    seller: "Fresh Harvest Co.",
    location: "Taytay, Rizal",
    rating: 4.9,
    unit: "bundle",
  },
  {
    id: 4,
    name: "String beans (Sitaw)",
    price: 55,
    seller: "Green Valley Farm",
    location: "Tanay, Rizal",
    rating: 4.7,
    unit: "kg",
  },
  {
    id: 5,
    name: "Carrots",
    price: 65,
    seller: "Mountain Produce",
    location: "Antipolo, Rizal",
    rating: 4.5,
    unit: "kg",
  },
  {
    id: 6,
    name: "Pechay",
    price: 28,
    seller: "Buhay Bukid",
    location: "Cainta, Rizal",
    rating: 4.8,
    unit: "bundle",
  },
  {
    id: 7,
    name: "Red onions",
    price: 92,
    seller: "Fresh Harvest Co.",
    location: "Taytay, Rizal",
    rating: 4.4,
    unit: "kg",
  },
];
function Panel({ title, children, className = "" }) {
  return (
    <section className={`buyer-panel ${className}`}>
      <div className="buyer-panel-head">{title}</div>
      {children}
    </section>
  );
}
function ProductCard({ product, onOpen, saved, onSave }) {
  return (
    <article className="buyer-product">
      <button
        className="buyer-product-image"
        aria-label={`View ${product.name}`}
        onClick={() => onOpen(product.id)}
      />
      <button
        className="buyer-save"
        onClick={() => onSave(product.id)}
        aria-label={saved ? "Remove from saved" : "Save product"}
      >
        {saved ? "♥" : "♡"}
      </button>
      <button className="buyer-product-name" onClick={() => onOpen(product.id)}>
        {product.name}
      </button>
      <strong>
        ₱{product.price}/{product.unit}
      </strong>
      <span>
        ★ {product.rating} · {product.seller}
      </span>
    </article>
  );
}

export function BuyerDashboard() {
  const [saved] = useState([2, 4, 6]);
  const [notice, setNotice] = useState("");
  return (
    <div className="buyer-page">
      <Panel title="ORDER STATUS SUMMARY">
        <div className="buyer-status-grid">
          <div>
            <b>3</b>
            <span>PENDING</span>
          </div>
          <div>
            <b>2</b>
            <span>IN TRANSIT</span>
          </div>
          <div>
            <b>18</b>
            <span>DELIVERED</span>
          </div>
        </div>
        <div className="buyer-progress">
          <span>PLACED</span>
          <span>SHIPPED</span>
          <span>IN TRANSIT</span>
          <span>DELIVERED</span>
        </div>
      </Panel>
      <div className="buyer-grid two">
        <Panel title="RECENT ORDERS">
          <div className="buyer-list">
            {products.slice(0, 3).map((p, i) => (
              <div className="buyer-list-row" key={p.id}>
                <span className="buyer-thumb" />
                <span>{p.name}</span>
                <em className={`buyer-tag tag-${i}`}>
                  {["IN TRANSIT", "DELIVERED", "PENDING"][i]}
                </em>
                <button
                  className="buyer-outline"
                  onClick={() =>
                    setNotice(`Added ${p.name} to your reorder list.`)
                  }
                >
                  RE-ORDER
                </button>
              </div>
            ))}
          </div>
          <Link className="buyer-text-link" to="/buyer/orders">
            VIEW ORDER HISTORY
          </Link>
        </Panel>
        <Panel title="SAVED & FAVORITES">
          <div className="buyer-favorite-grid">
            {saved.map((id) => {
              const p = products.find((x) => x.id === id);
              return (
                <Link
                  to={`/buyer/products/${id}`}
                  className="buyer-favorite"
                  key={id}
                >
                  <span />
                  {p.name}
                </Link>
              );
            })}
          </div>
          <Link className="buyer-text-link" to="/buyer/saved">
            VIEW ALL SAVED
          </Link>
        </Panel>
      </div>
      <div className="buyer-grid three">
        <Panel title="SPENDING SUMMARY">
          <p className="buyer-stat-line">
            THIS MONTH <b>₱146.50</b>
          </p>
          <p className="buyer-stat-line">
            TOTAL SPENT <b>₱1,982.00</b>
          </p>
          <p className="buyer-stat-line">
            ORDERS PLACED <b>23</b>
          </p>
        </Panel>
        <Panel title="PENDING REVIEWS">
          <div className="buyer-list">
            {products.slice(0, 2).map((p) => (
              <div className="buyer-list-row" key={p.id}>
                <span className="buyer-thumb" />
                <span>{p.name}</span>
                <b>★★★★★</b>
              </div>
            ))}
          </div>
          <Link className="buyer-text-link" to="/buyer/reviews">
            RATE & REVIEWS
          </Link>
        </Panel>
        <Panel title="RECOMMENDED FOR YOU">
          {products.slice(3, 5).map((p) => (
            <Link
              className="buyer-recommend"
              key={p.id}
              to={`/buyer/products/${p.id}`}
            >
              <span className="buyer-thumb" />
              {p.name}
            </Link>
          ))}
        </Panel>
      </div>
      <Panel title="NOTIFICATION & ALERTS" className="buyer-dark">
        <p>
          ▰　Your order is out for delivery <small>10 MINS AGO</small>
        </p>
        <p>
          ▰　Price drop: Tomatoes are now ₱48/kg <small>3 HOURS AGO</small>
        </p>
        <p>
          ▰　New message from seller <small>YESTERDAY</small>
        </p>
        <Link className="buyer-text-link" to="/inbox">
          VIEW ALL NOTIFICATIONS
        </Link>
      </Panel>
      {notice && (
        <p className="buyer-notice" role="status">
          {notice}
        </p>
      )}
    </div>
  );
}

export function BuyerBrowse() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Nearest");
  const [saved, setSaved] = useState([]);
  const filtered = useMemo(
    () =>
      products
        .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) =>
          sort === "Price Low"
            ? a.price - b.price
            : sort === "Price High"
              ? b.price - a.price
              : 0,
        ),
    [query, sort],
  );
  const open = (id) => {
    window.location.href = `/buyer/products/${id}`;
  };
  return (
    <div className="buyer-page">
      <div className="buyer-market-heading">
        <Link className="buyer-outline" to="/buyer/price-comparison">
          Price comparison
        </Link>
        <div className="buyer-search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: products, categories, or sellers..."
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All</option>
            <option>Vegetables</option>
            <option>Fruit</option>
            <option>Grains</option>
          </select>
          <Link to="/inbox">♧</Link>
        </div>
      </div>
      <div className="buyer-category-strip">
        {["Tomatoes", "Eggplant", "Kangkong", "String beans", "Carrots"].map(
          (t) => (
            <button key={t} onClick={() => setQuery(t)}>
              {t}
            </button>
          ),
        )}
      </div>
      <div className="buyer-browse-layout">
        <aside className="buyer-filters">
          <b>FILTERS</b>
          <hr />
          <b>CATEGORY</b>
          {["All", "Vegetables", "Fruit", "Grains"].map((x) => (
            <label key={x}>
              <input
                type="radio"
                name="category"
                checked={category === x}
                onChange={() => setCategory(x)}
              />
              {x}
            </label>
          ))}
          <hr />
          <b>LOCATION / DISTANCE</b>
          <label>
            <input type="checkbox" defaultChecked /> Within 5 km
          </label>
          <label>
            <input type="checkbox" /> Within 15 km
          </label>
          <label>
            <input type="checkbox" /> Any distance
          </label>
          <hr />
          <b>AVAILABILITY</b>
          <label>
            <input type="checkbox" defaultChecked /> In stock now
          </label>
          <hr />
          <b>SELLER RATING</b>
          <p>★★★★★</p>
          <p>★★★★☆</p>
        </aside>
        <div className="buyer-results">
          <div className="buyer-featured">
            {products.slice(0, 4).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpen={open}
                saved={saved.includes(p.id)}
                onSave={(id) =>
                  setSaved((s) =>
                    s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
                  )
                }
              />
            ))}
          </div>
          <h3>
            {filtered.length} results for "{query || "produce near me"}"
          </h3>
          <div className="buyer-sort">
            SORT:{" "}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Nearest</option>
              <option>Price Low</option>
              <option>Price High</option>
              <option>Top-rated</option>
            </select>
          </div>
          <div className="buyer-product-grid">
            {filtered.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onOpen={open}
                saved={saved.includes(p.id)}
                onSave={(id) =>
                  setSaved((s) =>
                    s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BuyerProduct() {
  const id = Number(window.location.pathname.split("/").pop());
  const product = products.find((p) => p.id === id) || products[0];
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");
  return (
    <div className="buyer-page">
      <p className="buyer-breadcrumb">
        <Link to="/buyer/browse">Market</Link> / {product.name}
      </p>
      <h1>PRODUCT DETAILS</h1>
      <div className="buyer-detail">
        <div>
          <div className="buyer-detail-image" />
          <div className="buyer-detail-thumbs">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div>
          <h2>{product.name}</h2>
          <p>
            Sold by <b>{product.seller}</b>
          </p>
          <h2>
            ₱{product.price}/{product.unit}
          </h2>
          <p>Available now · Freshly harvested</p>
          <label>
            Quantity{" "}
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            />
          </label>
          <p>
            <button
              className="buyer-primary"
              onClick={() => setMessage(`${qty} item(s) added to your cart.`)}
            >
              Add to Cart
            </button>{" "}
            <button
              className="buyer-outline"
              onClick={() =>
                setMessage(`Contact request prepared for ${product.seller}.`)
              }
            >
              Contact Seller
            </button>
          </p>
          <p>{message}</p>
          <hr />
          <h3>Description</h3>
          <p>
            Fresh local produce supplied by nearby farmers. Coordinate delivery
            or pickup with the seller.
          </p>
          <div className="buyer-seller-card">
            <span className="buyer-thumb" />
            <div>
              <b>{product.seller}</b>
              <p>
                {product.location} · ★ {product.rating}
              </p>
            </div>
            <Link className="buyer-outline" to="/buyer/browse">
              More listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BuyerPriceComparison() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("Tomatoes (Kamatis)");
  const [distance, setDistance] = useState("Within 15 km");
  const [sort, setSort] = useState("Lowest price");
  const list = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()),
  );
  const current = products.find((p) => p.name === selected) || products[0];
  return (
    <div className="buyer-page">
      <h2>Fair Price Check</h2>
      <p>
        Compare what sellers charge per kilo with the market price before you
        buy.
      </p>
      <div className="buyer-compare-controls">
        <input
          placeholder="Search product..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={selected} onChange={(e) => setSelected(e.target.value)}>
          {products.map((p) => (
            <option key={p.id}>{p.name}</option>
          ))}
        </select>
        <select value={distance} onChange={(e) => setDistance(e.target.value)}>
          <option>Within 5 km</option>
          <option>Within 15 km</option>
          <option>Within 50 km</option>
          <option>Any distance</option>
        </select>
      </div>
      <div className="buyer-grid four">
        {[
          "Lowest price",
          "Average price",
          "Highest price",
          "Market price (DA)",
        ].map((x, i) => (
          <Panel title={x} key={x}>
            <h2>
              ₱
              {
                [
                  Math.max(10, current.price - 12),
                  current.price + 3,
                  current.price + 16,
                  current.price + 2,
                ][i]
              }
              /kg
            </h2>
          </Panel>
        ))}
      </div>
      <div className="buyer-compare-layout">
        <div className="buyer-compare-list">
          {list.map((p) => (
            <button
              className={selected === p.name ? "selected" : ""}
              key={p.id}
              onClick={() => setSelected(p.name)}
            >
              <b>{p.name}</b>
              <span>
                ₱{p.price}/{p.unit}
              </span>
            </button>
          ))}
        </div>
        <div>
          <Panel title={current.name}>
            <div className="buyer-range">
              <span>₱{current.price - 12}/kg</span>
              <div>
                <i />
              </div>
              <span>₱{current.price + 16}/kg</span>
            </div>
            <p className="buyer-center">Market price ₱{current.price + 2}/kg</p>
          </Panel>
          <Panel title="SELLERS FOR THIS PRODUCT">
            <div className="buyer-sort">
              Sort:{" "}
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option>Lowest price</option>
                <option>Highest price</option>
                <option>Top-rated</option>
              </select>
            </div>
            <table className="buyer-table">
              <thead>
                <tr>
                  <th>SELLER</th>
                  <th>LOCATION</th>
                  <th>PRICE PER KG</th>
                  <th>VS MARKET</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {[
                  current,
                  {
                    ...current,
                    price: current.price + 7,
                    seller: "Buhay Bukid",
                  },
                  {
                    ...current,
                    price: current.price - 4,
                    seller: "Mountain Produce",
                  },
                ]
                  .sort((a, b) =>
                    sort === "Highest price"
                      ? b.price - a.price
                      : a.price - b.price,
                  )
                  .map((p, i) => (
                    <tr key={p.seller}>
                      <td>{p.seller}</td>
                      <td>{p.location}</td>
                      <td>
                        ₱{p.price}/{p.unit}
                      </td>
                      <td>
                        <span className="buyer-tag">
                          {p.price < current.price + 2
                            ? "BELOW MARKET"
                            : p.price === current.price + 2
                              ? "FAIR PRICE"
                              : "ABOVE MARKET"}
                        </span>
                      </td>
                      <td>
                        <Link
                          className="buyer-primary"
                          to={`/buyer/products/${current.id}`}
                        >
                          View listing
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Panel>
        </div>
      </div>
      <p className="buyer-muted">
        Market reference is a demonstration value for testing; connect an
        official DA price feed for live market prices.
      </p>
    </div>
  );
}

export function BuyerMessages() {
  const [active, setActive] = useState(0);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    [
      "Hi! When is the harvest date?",
      "Hello! The next harvest is tomorrow morning.",
    ],
  ]);
  const chats = [
    { name: "Green Valley Farm", preview: "The harvest is tomorrow morning." },
    { name: "Buhay Bukid", preview: "Thanks for your order." },
    { name: "Fresh Harvest Co.", preview: "Available for pickup." },
  ];
  function send(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setMessages((prev) => {
      const next = [...prev];
      next[active] = [...(next[active] || []), text.trim()];
      return next;
    });
    setText("");
  }
  return (
    <div className="buyer-page">
      <div className="buyer-messages">
        <aside>
          <input placeholder="Search messages..." />
          <h4>NEEDS A REPLY</h4>
          {chats.map((c, i) => (
            <button
              className={active === i ? "selected" : ""}
              key={c.name}
              onClick={() => setActive(i)}
            >
              <span className="buyer-thumb" />
              <b>{c.name}</b>
              <small>{c.preview}</small>
            </button>
          ))}
        </aside>
        <section>
          <header>
            <span className="buyer-thumb" />
            <div>
              <b>{chats[active].name}</b>
              <small>Local seller · Recent conversation</small>
            </div>
          </header>
          <div className="buyer-chat">
            <p className="buyer-chat-date">TODAY</p>
            {(
              messages[active] || ["Hello! How can I help with your order?"]
            ).map((m, i) => (
              <p
                className={i % 2 === 0 ? "buyer-bubble" : "buyer-bubble own"}
                key={i}
              >
                {m}
              </p>
            ))}
          </div>
          <form onSubmit={send}>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write a message..."
              aria-label="Write a message"
            />
            <button className="buyer-primary">➤</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export function BuyerOrders() {
  return (
    <div className="buyer-page">
      <h1>Order History</h1>
      <Panel title="YOUR ORDERS">
        {products.slice(0, 4).map((p, i) => (
          <div className="buyer-list-row" key={p.id}>
            <span className="buyer-thumb" />
            <span>
              {p.name} · ₱{p.price}/{p.unit}
            </span>
            <em className="buyer-tag">
              {["In transit", "Delivered", "Pending", "Delivered"][i]}
            </em>
            <Link className="buyer-outline" to={`/buyer/products/${p.id}`}>
              View details
            </Link>
          </div>
        ))}
      </Panel>
    </div>
  );
}
export function BuyerSaved() {
  const [saved, setSaved] = useState([1, 3, 5]);
  return (
    <div className="buyer-page">
      <h1>Saved & Favorites</h1>
      <div className="buyer-product-grid">
        {products
          .filter((p) => saved.includes(p.id))
          .map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onOpen={(id) => (window.location.href = `/buyer/products/${id}`)}
              saved
              onSave={(id) => setSaved((s) => s.filter((x) => x !== id))}
            />
          ))}
      </div>
    </div>
  );
}
export function BuyerReviews() {
  const [rated, setRated] = useState({});
  return (
    <div className="buyer-page">
      <h1>Rate & Reviews</h1>
      <Panel title="ITEMS AWAITING YOUR RATING">
        {products.slice(0, 3).map((p) => (
          <div className="buyer-list-row" key={p.id}>
            <span className="buyer-thumb" />
            <span>{p.name}</span>
            <select
              aria-label={`Rate ${p.name}`}
              value={rated[p.id] || "5"}
              onChange={(e) =>
                setRated((r) => ({ ...r, [p.id]: e.target.value }))
              }
            >
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </select>
          </div>
        ))}
      </Panel>
    </div>
  );
}
