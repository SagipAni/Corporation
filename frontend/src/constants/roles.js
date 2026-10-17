// The three roles used for the temporary frontend-only role system.
export const ROLES = ["seller", "buyer", "admin"];

// Where each role lands after logging in, and where a wrong-role visitor is sent.
export const roleHome = {
  seller: "/seller/dashboard",
  buyer: "/buyer/dashboard",
  admin: "/admin/dashboard",
};
