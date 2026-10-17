// Static sample data for the admin pages. Text matches the design screenshots.

/* ---------- Dashboard ---------- */

export const dashboardStats = [
  { value: "24", label: "Listings awaiting review" },
  { value: "4", label: "Open reports and disputes" },
  { value: "7", label: "Support tickets to answer" },
  { value: "3", label: "Sellers pending verification" },
];

export const dashboardModules = [
  {
    title: "Provision seller account",
    description:
      "Create a seller profile and issue a unique Seller ID and password",
    badge: "3 pending",
    path: "/admin/sellers/new",
  },
  {
    title: "Listing moderation",
    description:
      "Review, approve or remove listings and handle flagged content.h",
    badge: "5 to review",
    path: "/admin/listings",
  },
  {
    title: "Reports & disputes",
    description:
      "Buyer and seller disputes, refund requests, trust and safety.",
    badge: "4 open",
    path: "/admin/reports",
  },
  {
    title: "User management",
    description: "View or suspend accounts, verify sellers, manage roles.",
    badge: "3 to verify",
    path: "/admin/users",
  },
  {
    title: "Support oversight",
    description:
      "Manage help articles, answer tickets, update post-system status.",
    badge: "7 tickets",
    path: "/admin/support",
  },
  {
    title: "System settings",
    description: "Categories, verification rules, notifications and analytics.",
    badge: "Up to date",
    path: "/admin/settings",
  },
];

export const needsAttention = [
  {
    title: "Flagged listing: Signed basketball jersey",
    detail: "Priced at ₱72,000, above the auto-flag limit",
    path: "/admin/listings",
  },
  {
    title: "High-severity dispute #4121",
    detail: "Item not received, Maria S. vs Rico T",
    path: "/admin/reports",
  },
  {
    title: "Seller waiting for verification",
    detail: "Casa Habi, submitted 2 days ago",
    path: "/admin/users",
  },
  {
    title: "Ticket unanswered for 24 hours",
    detail: "Refund status question from Ana P.",
    path: "/admin/support",
  },
];

export const recentActivity = [
  {
    title: "Listing approved",
    detail: "Rattan storage basket",
    time: "10 min ago",
  },
  { title: "Seller suspended", detail: "QuickDeals88", time: "1 hr ago" },
  { title: "Case closed", detail: "#4108 refund request", time: "3 hrs ago" },
  {
    title: "Seller account created",
    detail: "Batangas Farm Direct",
    time: "Yesterday",
  },
];

/* ---------- Provision seller account ---------- */

export const recentlyIssued = [
  { business: "Sunny Acres Farm", sellerId: "SLR-2026-08420" },
  { business: "Rolling Hills Livestock", sellerId: "SLR-2026-08419" },
];

/* ---------- Listing moderation ---------- */

export const moderationListings = [
  {
    title: "Hand rotten basket",
    seller: "Hearth & Home Co.",
    price: "₱850",
    submitted: "2 hrs ago",
    status: "Pending",
  },
  {
    title: "Vintage Cap",
    seller: "Rolling Hills Cup.",
    price: "₱1100",
    submitted: "2 hrs ago",
    status: "Pending",
  },
  {
    title: "Egg",
    seller: "Sunny Eggs Farm",
    price: "₱1100",
    submitted: "8 hrs ago",
    status: "Pending",
  },
];

export const moderationTabs = [
  "Pending(18)",
  "Flagged(5)",
  "Approved",
  "Removed",
];

/* ---------- Price monitoring ---------- */

export const priceStats = [
  { label: "Products tracked", value: "(COUNT)" },
  { label: "Prices updated this week", value: "(COUNT)" },
  { label: "Listings above range", value: "(COUNT)" },
  { label: "Listings below range", value: "(COUNT)" },
];

export const referencePrices = [
  "Tomatoes (Kamatis)",
  "Eggplant (Talong)",
  "Kangkong",
  "String beans (Sitaw)",
].map((product) => ({
  product,
  daPrice: "₱(PRICE)/kg",
  sellerAverage: "₱(PRICE)/kg",
  fairRange: "₱(LOW) – ₱(HIGH)",
  lastUpdated: "(DATE)",
}));

export const outOfRangeListings = [1, 2].map(() => ({
  listing: "(PRODUCT NAME)",
  seller: "(BUSINESS NAME)",
  price: "₱(PRICE)/kg",
  marketPrice: "₱(PRICE)/kg",
  status: "ABOVE RANGE",
}));

/* ---------- Reports & disputes ---------- */

export const caseStats = [
  { label: "Open cases", value: "24" },
  { label: "Refund request", value: "8" },
  { label: "Avg. Resolution", value: "1.8d" },
  { label: "Escalated", value: "2" },
];

export const caseTabs = ["All(28)", "Disputes", "Refunds", "Trust & safety"];

export const cases = [
  {
    caseNumber: "#1234",
    subject: "Item never delivered",
    parties: "Buyer J. Cruz vs. Hearth & Home",
    type: "Dispute",
    severity: "HIGH",
  },
  {
    caseNumber: "#1235",
    subject: "Refund for damaged item",
    parties: "Buyer A. Reyes vs. Sunny Acres",
    type: "Refund",
    severity: "MEDIUM",
  },
  {
    caseNumber: "#1235",
    subject: "Suspicious repeated listings",
    parties: "Seller: Rolling Hills",
    type: "Trust & safety",
    severity: "LOW",
  },
];

export const severityColor = {
  HIGH: "badge-red",
  MEDIUM: "badge-amber",
  LOW: "badge-green",
};

/* ---------- User management ---------- */

export const userTabs = ["All(28)", "Buyers", "Sellers", "Admin", "Suspended"];

export const initialUsers = [
  {
    id: 1,
    name: "Maria Santos",
    detail: "SLR-2026-08421",
    role: "Seller",
    status: "Pending",
    joined: "Sept 24, 2026",
  },
  {
    id: 2,
    name: "Juan Cruz",
    detail: "Buyer account",
    role: "Buyer",
    status: "Active",
    joined: "Jan 18, 2026",
  },
  {
    id: 3,
    name: "Rolling Hills Livestock",
    detail: "SLR-2026-08419",
    role: "Seller",
    status: "Suspended",
    joined: "Aug 27, 2026",
  },
];

export const statusColor = {
  Pending: "badge-red",
  Active: "badge-green",
  Suspended: "badge-amber",
};

/* ---------- Support oversight ---------- */

export const supportTabs = ["help articles", "Ticket", "System Status"];

export const systemStatus = [
  { name: "Marketplace", state: "Operational" },
  { name: "Payments & payouts", state: "Delays reported" },
  { name: "Messaging", state: "Operational" },
];

export const statusSteps = [
  "Investigation",
  "Identified",
  "Monitoring",
  "Resolved",
];

/* ---------- System settings ---------- */

export const settingsTabs = [
  "Categories",
  "Verificationrules",
  "Notifications",
  "Analytics",
];

export const productCategories = [
  { name: "Home & Living", listings: "142 listings" },
  { name: "Farm & Livestock", listings: "89 listings" },
  { name: "Electronics", listings: "61 listings" },
];
