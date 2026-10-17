// Static sample data for the shared pages (Profile, Inbox, Help Center,
// Support Tickets).
// FRONTEND ONLY: replace with real API calls once the backend is ready.

// One sample profile per role. `fields` are editable on the Profile page.
export const profiles = {
  seller: {
    name: "Juan Dela Cruz",
    roleLabel: "Seller",
    verification: "Verified",
    memberSince: "March 2026",
    fields: [
      { key: "name", label: "Full name", value: "Juan Dela Cruz" },
      { key: "email", label: "Email", value: "juan.delacruz@example.com" },
      { key: "phone", label: "Phone", value: "0917 123 4567" },
      {
        key: "farm",
        label: "Farm / business name",
        value: "Dela Cruz Family Farm",
      },
      {
        key: "farmInfo",
        label: "Farm info",
        value: "2.5 hectares, vegetables and fruit",
      },
    ],
  },
  buyer: {
    name: "Maria Santos",
    roleLabel: "Buyer",
    verification: "Verified",
    memberSince: "May 2026",
    fields: [
      { key: "name", label: "Full name", value: "Maria Santos" },
      { key: "email", label: "Email", value: "maria.santos@example.com" },
      { key: "phone", label: "Phone", value: "0928 765 4321" },
      {
        key: "address",
        label: "Delivery address",
        value: "12 Mabini St., Quezon City",
      },
    ],
  },
  admin: {
    name: "Platform Admin",
    roleLabel: "Admin",
    verification: "Verified",
    memberSince: "January 2026",
    fields: [
      { key: "name", label: "Full name", value: "Platform Admin" },
      { key: "email", label: "Email", value: "admin@example.com" },
      { key: "phone", label: "Phone", value: "0900 000 0000" },
    ],
  },
};

export const initialNotifications = [
  {
    id: 1,
    title: "Order update",
    body: "An order moved to Out for Delivery.",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    title: "New message",
    body: "You have a new message about a listing.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 3,
    title: "Payment approved",
    body: "A payment was approved and the order was placed.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: 4,
    title: "Support ticket replied",
    body: "Support replied to ticket #T-1002.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 5,
    title: "Welcome to Sagip Ani",
    body: "Your account is ready. Take a look around.",
    time: "Last week",
    unread: false,
  },
];

export const helpCategories = [
  "Orders & Shipping",
  "Listings",
  "Ratings & Reviews",
  "Messaging",
  "Payments & Payouts",
  "Account & Settings",
  "Trust & Safety",
  "Getting Started",
];

export const helpGuides = [
  "Setting up your seller shop",
  "Publishing your first listing",
  "Placing your first order",
];

export const faqs = [
  {
    question: "How long do payouts take to arrive?",
    answer:
      "Payout timing depends on your payment provider and bank processing schedule. Check Payment & Payout settings for the current payout method.",
  },
  {
    question: "Can I message a seller before I buy?",
    answer:
      "Yes. Open a seller's listing and use the message option when it is available.",
  },
  {
    question: "What happens if a listing gets flagged?",
    answer:
      "A flagged listing may be temporarily hidden while it is reviewed. Check your notifications or open a support ticket if you need help.",
  },
  {
    question: "How do I track an existing ticket?",
    answer:
      "Open Services, then Support Tickets. Select a ticket to review its status and replies.",
  },
];

export const systemStatus = [
  "Marketplace / Checkout",
  "Messaging",
  "Payments & Payouts",
  "Search",
];

export const ticketKinds = ["Support issue", "Bug report", "Feature request"];

export const ticketCategories = [
  "Payments & Payouts",
  "Orders & Delivery",
  "Listings & Selling",
  "Reports & Disputes",
  "Account & Security",
  "Other",
];

export const ticketFilters = [
  "All",
  "In progress",
  "Waiting on you",
  "Resolved",
];

export const supportTickets = [
  {
    id: "SA-1042",
    subject: "Payment payout not received",
    status: "In progress",
    date: "Oct 12, 2026",
    messages: [
      {
        from: "Support",
        text: "We are checking the payout status with our payment provider.",
      },
      {
        from: "You",
        text: "Thank you. Please let me know when there is an update.",
      },
    ],
  },
  {
    id: "SA-1038",
    subject: "Listing image upload issue",
    status: "Waiting on you",
    date: "Oct 10, 2026",
    messages: [
      {
        from: "Support",
        text: "Could you attach the image that fails to upload?",
      },
    ],
  },
  {
    id: "SA-1021",
    subject: "Update farm details",
    status: "Waiting on you",
    date: "Oct 7, 2026",
    messages: [
      {
        from: "Support",
        text: "Please confirm your farm location to continue.",
      },
    ],
  },
  {
    id: "SA-0998",
    subject: "Order notification delay",
    status: "Resolved",
    date: "Oct 2, 2026",
    messages: [
      { from: "Support", text: "The notification issue has been resolved." },
    ],
  },
  {
    id: "SA-0987",
    subject: "Verification document status",
    status: "Resolved",
    date: "Sep 29, 2026",
    messages: [{ from: "Support", text: "Your documents have been received." }],
  },
];
