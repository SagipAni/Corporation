import { useRef } from "react";
import { Link } from "react-router-dom";
import useReveal from "../../hooks/useReveal.js";
import "../../styles/landing.css";
import image from "../../assets/login_img.jpg";
import logo from "../../assets/sagipani_logo_cropped.png";
import tomatoesImg from "../../assets/card-img/tomatoes.jpg";
import eggplantImg from "../../assets/card-img/eggplant.jpg";
import kangkongImg from "../../assets/card-img/kangkong.jpg";
import mangoImg from "../../assets/card-img/mango.jpg";
import { Check } from "../../assets/icons/Icon.jsx";
import {
  ConnectIcon,
  ScaleIcon,
  GroupIcon,
} from "../../assets/icons/FeatureIcons.jsx";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Harvest", href: "#harvest" },
  { label: "Contact", href: "#contact" },
];

const stats = [
  { value: "120+", label: "Farmers onboarded" },
  { value: "3,500 kg", label: "Harvest sold" },
  { value: "15", label: "Barangays reached" },
  { value: "0%", label: "Middleman fees" },
];

const features = [
  {
    title: "Connect Directly with Buyers",
    text: "Sell your harvest straight to buyers — no middlemen, no markdowns. Reach wider markets from your farm.",
    Icon: ConnectIcon,
  },
  {
    title: "Fair & Transparent Pricing",
    text: "Set and see fair prices for your produce, so you earn what your harvest is actually worth.",
    Icon: ScaleIcon,
  },
  {
    title: "Simple, Organized Selling",
    text: "Manage orders, track sales, and keep transactions organized — all in one place.",
    Icon: GroupIcon,
  },
];

const steps = [
  {
    number: "01",
    title: "Post your harvest",
    text: "Add a photo, quantity, and your price in under a minute.",
  },
  {
    number: "02",
    title: "Buyers place orders",
    text: "Buyers browse and order directly. No middleman in between.",
  },
  {
    number: "03",
    title: "Deliver and get paid",
    text: "Track every order and keep your sales records organized.",
  },
];

const harvest = [
  {
    name: "Tomatoes",
    address: "Angono, Rizal",
    price: "P45/kg",
    img: tomatoesImg,
  },
  {
    name: "Eggplant",
    address: "Binangonan, Rizal",
    price: "P60/kg",
    img: eggplantImg,
  },
  {
    name: "Kangkong",
    address: "Taytay, Rizal",
    price: "P25/kg",
    img: kangkongImg,
  },
  {
    name: "Mangoes",
    address: "Morong, Rizal",
    price: "P120/kg",
    img: mangoImg,
  },
];

const farmerPoints = [
  "Post a harvest in under a minute",
  "Keep 100% of your price",
  "Track orders and sales records",
];

const orders = [
  {
    id: "Order #128",
    item: "Tomatoes 20 kg",
    status: "Delivered",
    tone: "delivered",
  },
  {
    id: "Order #129",
    item: "Eggplant 15 kg",
    status: "Preparing",
    tone: "preparing",
  },
  { id: "Order #130", item: "Kangkong 30 bundles", status: "New", tone: "new" },
];

const buyerPoints = [
  "Know exactly where it comes from",
  "See transparent prices upfront",
  "Order directly, no markups",
];

const filters = ["All", "Vegetables", "Fruits", "Near me"];

const searchItems = [
  { name: "Tomatoes", price: "P60/kg" },
  { name: "Eggplant", price: "P45/kg" },
  { name: "Kangkong", price: "P25" },
];

const footerColumns = [
  {
    head: "PLATFORM",
    links: ["How it works", "Harvest", "For farmers", "For buyers"],
  },
  { head: "SUPPORT", links: ["Contact", "FAQ", "Terms", "Privacy"] },
  {
    head: "CONTACT",
    links: ["Sagipani@gmail.com", "+63 938 3841 419", "Rizal, Philippines"],
  },
];

function Landing() {
  // Fades sections in as they scroll into view (see hooks/useReveal.js).
  const pageRef = useRef(null);
  useReveal(pageRef);

  return (
    <main className="landing" ref={pageRef}>
      {/* hero section */}
      <header className="hero" id="top">
        <nav className="nav" aria-label="Main">
          <a href="#top" className="nav_brand">
            <img src={logo} alt="" />
            <span>Sagip Ani</span>
          </a>
          <ul className="nav_links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav_actions">
            <Link to="/login" className="nav_btn">
              Login
            </Link>
            <Link to="/signup" className="nav_btn nav_btn_alt">
              Sign-up
            </Link>
          </div>
        </nav>

        <div className="hero_content">
          <h1>SAGIP ANI</h1>
          <h5>BAYANIHAN HARVEST DISTRIBUTION SYSTEM</h5>
          <p>
            A web-based platform designed to support local farmers by connecting
            them directly with buyers, helping them reach wider markets, promote
            their harvest, and gain better opportunities to sell their products
            at fair prices.
          </p>
        </div>
      </header>

      {/* impact numbers section */}
      <section className="impact_numbers" aria-label="Impact numbers">
        {stats.map((stat) => (
          <div className="numbers" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* about section */}
      <section className="about" id="about">
        <div className="about_left">
          <div className="section_head" data-reveal>
            <p className="Tag1_about">WHY SAGIP ANI</p>
            <h2 className="Tag2_about">Built for Farmers Industry</h2>
          </div>
          <div className="about_container" data-reveal="left">
            <p className="Tag3_about">ABOUT</p>
            <div className="about_content">
              <img src={image} alt="Farmer" />
              <img src={image} alt="Agriculture" />
              <img src={image} alt="Market" />
            </div>
            <p className="about_lead">
              Sagip Ani is a web-based agricultural platform designed to support
              local farmers by connecting them directly with buyers.
            </p>
            <p className="about_text">
              It provides a more accessible way to promote and sell fresh
              agricultural products while supporting fair pricing, better market
              access, and more organized transactions.
            </p>
          </div>
        </div>

        <div className="features">
          {features.map(({ title, text, Icon }) => (
            <article className="box" key={title} data-reveal="right">
              <div className="box_text">
                <h3>{title}</h3>
                <p>{text}</p>
                <button type="button" className="learn_more">
                  Learn More <span aria-hidden="true">›</span>
                </button>
              </div>
              <div className="box_icon">
                <Icon />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* steps section */}
      <section className="steps" id="how-it-works">
        <div className="section_head" data-reveal>
          <p className="Tag1_about">HOW IT WORKS</p>
          <h2 className="Tag2_about Tag2_wide">
            From farm to table in 3 steps
          </h2>
        </div>
        <div className="steps_container">
          {steps.map((step) => (
            <article className="box_number" key={step.number} data-reveal>
              <span className="number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* harvest section */}
      <section className="harvest" id="harvest">
        <div className="section_head" data-reveal>
          <p className="Tag1_about">FRESH FROM THE FARM</p>
          <h2 className="Tag2_about Tag2_wide">This week’s harvest</h2>
        </div>
        <div className="harvest_container">
          {harvest.map((item) => (
            <article className="harvest_card" key={item.name} data-reveal>
              <img src={item.img} alt={item.name} />
              <div className="harvest_info">
                <h3 className="item_name">{item.name}</h3>
                <p className="address">{item.address}</p>
                <div className="harvest_bottom">
                  <span className="price">{item.price}</span>
                  <button type="button" className="order_btn">
                    Order
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* platform section */}
      <section className="platform">
        <div className="section_head" data-reveal>
          <p className="Tag1_about">ONE PLATFORM</p>
          <h2 className="Tag2_about Tag2_wide">
            Made for both sides of the market
          </h2>
        </div>

        <div className="plat_container">
          {/* farmers card */}
          <article className="platbox platbox_farmer" data-reveal>
            <div className="plat_top">
              <div className="plat_intro">
                <p className="plat_tag">FOR FARMERS</p>
                <h3 className="plat_title">Sell smarter, earn more</h3>
                <p className="plat_desc">
                  List your produce, set your own prices, and manage every order
                  from one simple dashboard.
                </p>
              </div>
              <div className="earn_box">
                <span>This week</span>
                <strong>P12,450</strong>
                <span className="earn_up">+18% earnings</span>
              </div>
            </div>
            <ul className="plat_list">
              {farmerPoints.map((point) => (
                <li key={point}>
                  <span className="check">
                    <Check />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="plat_footer">
              {orders.map((order) => (
                <div className="footer_context" key={order.id}>
                  <h4>{order.id}</h4>
                  <span className="order_item">{order.item}</span>
                  <span className={`process process_${order.tone}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </article>

          {/* buyers card */}
          <article className="platbox platbox_buyer" data-reveal>
            <div className="plat_top">
              <div className="plat_intro">
                <p className="plat_tag">FOR BUYERS</p>
                <h3 className="plat_title">Fresh, local, fairly priced</h3>
                <p className="plat_desc">
                  Search by crop, barangay, or price and buy produce straight
                  from the farmer who grew it.
                </p>
              </div>
            </div>
            <ul className="plat_list">
              {buyerPoints.map((point) => (
                <li key={point}>
                  <span className="check">
                    <Check />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="search_box">
              <div className="search_bar">
                <span>Search tomatoes, eggplant...</span>
                <span className="search_btn">Search</span>
              </div>
              <div className="filters">
                {filters.map((filter, index) => (
                  <span
                    key={filter}
                    className={index === 0 ? "filter active" : "filter"}
                  >
                    {filter}
                  </span>
                ))}
              </div>
              <div className="search_items">
                {searchItems.map((item) => (
                  <div className="item_card" key={item.name}>
                    <span>{item.name}</span>
                    <span className="item_price">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* call to action + footer share the hills background */}
      <div className="closing">
        <section className="cta" data-reveal>
          <div className="cta_text">
            <h2>Ready to sell your harvest?</h2>
            <p>
              Join local farmers already selling directly to buyers. Free to
              start.
            </p>
          </div>
          <div className="cta_buttons">
            <Link to="/signup" className="create_btn">
              Create free account
            </Link>
            <a href="#harvest" className="browse_btn">
              Browse harvest
            </a>
          </div>
        </section>

        <footer className="footer" id="contact">
          <div className="footer_wrapper" data-reveal>
            <div className="footer_brand">
              <h2>
                <img src={logo} alt="" /> Sagip Ani
              </h2>
              <p>
                Bayanihan Harvest Distribution System. Connecting local farmers
                directly with buyers for fair prices.
              </p>
              <div className="socials">
                <span>f</span>
                <span>in</span>
                <span>ig</span>
              </div>
            </div>
            {footerColumns.map((column) => (
              <div className="footer_links" key={column.head}>
                <p className="footer_head">{column.head}</p>
                {column.links.map((link) => (
                  <span key={link}>{link}</span>
                ))}
              </div>
            ))}
          </div>
          <div className="footer_bottom">
            <div className="footer_line"></div>
            <div className="footer_credit">
              <span>2026 Sagip Ani. All rights reserved.</span>
              <span>Made for local farmers</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default Landing;
