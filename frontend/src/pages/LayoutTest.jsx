import { Link, useLocation } from "react-router-dom";
import { useRole } from "../context/RoleContext.jsx";
import { ROLES } from "../constants/roles.js";

// TEMPORARY page for Stage 2 testing only. Delete it after Stage 2 is approved.
// It checks Tailwind + regular CSS, and lets you switch roles and try every route.

const testLinks = {
  Shared: [
    "/profile",
    "/inbox",
    "/help-center",
    "/support-tickets",
    "/support-tickets/new",
    "/account-security",
    "/privacy",
  ],
  Seller: [
    "/seller/dashboard",
    "/seller/update-details",
    "/seller/listings",
    "/seller/listings/new",
    "/seller/listings/performance",
    "/seller/messages",
    "/seller/orders",
    "/seller/inventory",
    "/seller/farm-planning",
  ],
  Buyer: [
    "/buyer/dashboard",
    "/buyer/browse",
    "/buyer/products/1",
    "/buyer/messages",
    "/buyer/roles",
  ],
  Admin: ["/admin/dashboard", "/admin/users"],
  Other: ["/", "/login", "/signup", "/does-not-exist"],
};

function LayoutTest() {
  const { role, setRole } = useRole();
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl bg-white p-6 shadow">
        <p className="text-sm font-medium uppercase tracking-widest text-green-800">
          Layout test (temporary)
        </p>
        <p className="mt-2">
          Current role: <strong>{role}</strong>
        </p>
        <p>
          Current path: <strong>{pathname}</strong>
        </p>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-green-800">
          Tailwind + CSS variables check
        </p>
        <div className="flex flex-wrap items-center gap-4">
          {/* Tailwind utilities */}
          <button
            type="button"
            className="rounded-full bg-green-900 px-5 py-2 text-white hover:bg-green-800"
          >
            Tailwind button
          </button>
          {/* Tailwind reading a CSS variable */}
          <span className="rounded-full bg-(--sage) px-4 py-1 text-sm font-semibold text-white">
            var(--sage) via Tailwind
          </span>
          {/* Plain CSS variable, no Tailwind */}
          <span
            style={{
              backgroundColor: "var(--forest-green)",
              color: "var(--white)",
              padding: "4px 16px",
              borderRadius: "999px",
            }}
          >
            var(--forest-green) via CSS
          </span>
          {/* Fonts */}
          <span
            style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem" }}
          >
            Playfair Display
          </span>
          <span style={{ fontFamily: "var(--font-body)" }}>Noto Sans</span>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-green-800">
          Switch role
        </p>
        <div className="flex flex-wrap gap-3">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={
                r === role
                  ? "rounded-full bg-green-900 px-4 py-1 text-white"
                  : "rounded-full border border-green-900 px-4 py-1 text-green-900"
              }
            >
              {r}
            </button>
          ))}
        </div>
        <p className="mt-3 text-sm">
          Switching to a role that cannot see this page should redirect you to
          that role's dashboard.
        </p>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-green-800">
          Try routes
        </p>
        {Object.entries(testLinks).map(([group, paths]) => (
          <div key={group} className="mb-4">
            <p className="mb-1 font-semibold">{group}</p>
            <div className="flex flex-wrap gap-2">
              {paths.map((path) => (
                <Link
                  key={path}
                  to={path}
                  className="rounded-full border border-green-900 px-3 py-1 text-sm text-green-900 hover:bg-green-100"
                >
                  {path}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default LayoutTest;
