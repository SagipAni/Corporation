// Sidebar menus. Each item has:
//   label  - text shown in the sidebar
//   icon   - key from components/NavIcons.jsx
//   path   - where the link goes
//   match  - every URL prefix that should highlight this item
//   action - (optional) "logout" makes the item a button instead of a link

export const adminNav = {
  badge: "Admin",
  main: [
    {
      label: "DASHBOARD",
      icon: "home",
      path: "/admin/dashboard",
      match: ["/admin/dashboard"],
    },
    {
      label: "PROVISION SELLER ACCOUNT",
      icon: "userPlus",
      path: "/admin/sellers/new",
      match: ["/admin/sellers"],
    },
    {
      // Price Monitoring is highlighted under Listing Moderation in the design.
      label: "LISTING MODERATION",
      icon: "tag",
      path: "/admin/listings",
      match: ["/admin/listings", "/admin/price-monitoring"],
    },
    {
      label: "REPORTS AND DISPUTE",
      icon: "flag",
      path: "/admin/reports",
      match: ["/admin/reports"],
    },
    {
      label: "USER MANAGEMENT",
      icon: "users",
      path: "/admin/users",
      match: ["/admin/users"],
    },
  ],
  footer: [
    {
      label: "SETTINGS",
      icon: "settings",
      path: "/admin/settings",
      match: ["/admin/settings"],
    },
    { label: "LOG OUT", icon: "logout", action: "logout" },
  ],
};

// The last three menu items are the same for sellers and buyers.
// Sellers use their own copies of the pages under /seller.
function sharedTail(prefix = "") {
  return [
    {
      label: "SERVICES",
      icon: "help",
      path: `${prefix}/help-center`,
      match: [`${prefix}/help-center`, `${prefix}/support-tickets`],
    },
    {
      label: "SETTINGS",
      icon: "settings",
      path: `${prefix}/account-security`,
      match: [`${prefix}/account-security`, `${prefix}/privacy`],
    },
  ];
}

export const sellerNav = {
  badge: null,
  main: [
    {
      label: "PROFILE",
      icon: "user",
      path: "/profile",
      match: ["/profile", "/seller/update-details"],
    },
    {
      label: "DASHBOARD",
      icon: "home",
      path: "/seller/dashboard",
      match: [
        "/seller/dashboard",
        "/seller/orders",
        "/seller/inventory",
        "/seller/farm-planning",
      ],
    },
    {
      label: "MARKET",
      icon: "tag",
      path: "/seller/listings",
      match: ["/seller/listings", "/seller/price-comparison"],
    },
    {
      label: "MESSAGES",
      icon: "message",
      path: "/seller/messages",
      match: ["/seller/messages"],
    },
    {
      label: "NOTIFICATIONS",
      icon: "inbox",
      path: "/inbox",
      match: ["/inbox"],
    },
    ...sharedTail("/seller"),
  ],
  footer: [],
};

export const buyerNav = {
  badge: null,
  main: [
    {
      label: "PROFILE",
      icon: "user",
      path: "/profile",
      match: ["/profile", "/buyer/roles"],
    },
    {
      label: "DASHBOARD",
      icon: "home",
      path: "/buyer/dashboard",
      match: ["/buyer/dashboard"],
    },
    {
      label: "MARKET",
      icon: "tag",
      path: "/buyer/browse",
      match: [
        "/buyer/browse",
        "/buyer/products",
        "/buyer/price-comparison",
        "/buyer/saved",
      ],
    },
    {
      label: "MESSAGES",
      icon: "message",
      path: "/buyer/messages",
      match: ["/buyer/messages"],
    },
    {
      label: "NOTIFICATIONS",
      icon: "inbox",
      path: "/inbox",
      match: ["/inbox"],
    },
    {
      label: "SERVICES",
      icon: "help",
      path: "/buyer/help-center",
      match: ["/buyer/help-center", "/buyer/support-tickets"],
    },
    {
      label: "SETTINGS",
      icon: "settings",
      path: "/buyer/account-security",
      match: ["/buyer/account-security", "/buyer/privacy"],
    },
  ],
  footer: [],
};

export const navByRole = {
  admin: adminNav,
  seller: sellerNav,
  buyer: buyerNav,
};

// True when the current URL belongs to a menu item.
export function isItemActive(item, pathname) {
  if (!item.match) return false;
  return item.match.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/"),
  );
}
