export const money = (value) =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(value);

// Quantity below this counts as "low stock".
export const LOW_STOCK_LIMIT = 25;
export const isLowStock = (quantity) =>
  quantity > 0 && quantity < LOW_STOCK_LIMIT;
export const stockTone = (quantity) =>
  quantity === 0
    ? "danger"
    : quantity < LOW_STOCK_LIMIT
      ? "warning"
      : "success";

export const products = [
  {
    id: 1,
    name: "Heirloom Tomatoes",
    category: "Vegetables",
    price: 85,
    unit: "kg",
    quantity: 45,
    status: "In stock",
    harvest: "Oct 18, 2026",
    views: 284,
    orders: 18,
  },
  {
    id: 2,
    name: "Eggplant (Talong)",
    category: "Vegetables",
    price: 55,
    unit: "kg",
    quantity: 22,
    status: "Low stock",
    harvest: "Oct 20, 2026",
    views: 176,
    orders: 11,
  },
  {
    id: 3,
    name: "Kangkong",
    category: "Leafy greens",
    price: 30,
    unit: "bundle",
    quantity: 0,
    status: "Out of stock",
    harvest: "Oct 15, 2026",
    views: 132,
    orders: 8,
  },
  {
    id: 4,
    name: "String Beans (Sitaw)",
    category: "Vegetables",
    price: 65,
    unit: "kg",
    quantity: 35,
    status: "In stock",
    harvest: "Oct 22, 2026",
    views: 98,
    orders: 6,
  },
];
export const orders = [
  {
    id: "10445",
    buyer: "Maria Santos",
    items: "Tomatoes × 3 kg",
    total: 255,
    status: "New",
    date: "Oct 12, 2026",
    fulfillment: "Farm pickup",
  },
  {
    id: "10442",
    buyer: "Juan Dela Cruz",
    items: "Eggplant × 2 kg",
    total: 110,
    status: "Processing",
    date: "Oct 11, 2026",
    fulfillment: "Local delivery",
  },
  {
    id: "10438",
    buyer: "Ana Reyes",
    items: "Kangkong × 4 bundles",
    total: 120,
    status: "Fulfilled",
    date: "Oct 10, 2026",
    fulfillment: "Farm pickup",
  },
  {
    id: "10431",
    buyer: "Carlo Mendoza",
    items: "String beans × 1 kg",
    total: 65,
    status: "Fulfilled",
    date: "Oct 9, 2026",
    fulfillment: "Local delivery",
  },
];
export const crops = [
  {
    id: 1,
    name: "Heirloom Tomatoes",
    status: "Growing",
    planted: "Sep 10, 2026",
    harvest: "Oct 18, 2026",
    yield: "80 kg",
  },
  {
    id: 2,
    name: "Eggplant",
    status: "Planned",
    planted: "Oct 15, 2026",
    harvest: "Dec 20, 2026",
    yield: "60 kg",
  },
];
export const messages = [
  {
    name: "Maria Santos",
    text: "When is the next harvest?",
    time: "10m ago",
    unread: true,
  },
  {
    name: "Juan Dela Cruz",
    text: "Can I order in bulk?",
    time: "3h ago",
    unread: true,
  },
  {
    name: "Ana Reyes",
    text: "Thank you for the fresh produce!",
    time: "Yesterday",
    unread: false,
  },
];
