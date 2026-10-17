import { NavLink } from "react-router-dom";
import { useRole } from "../context/RoleContext.jsx";

// `sellerTo`: seller accounts use their own copy of the page under /seller.
// `sellerOnly`: the target page only exists for sellers.
const groups = [
  {
    title: "Account",
    links: [
      { label: "Profile", to: "/profile" },
      {
        label: "Account & Security",
        to: "/account-security",
        sellerTo: "/seller/account-security",
      },
      { label: "Privacy", to: "/privacy", sellerTo: "/seller/privacy" },
    ],
  },
  {
    title: "Preferences",
    links: [
      {
        label: "Payment & Payout",
        to: "/seller/update-details",
        sellerOnly: true,
      },
      {
        label: "Language & Region",
        to: "/seller/update-details",
        sellerOnly: true,
      },
    ],
  },
];

export default function SettingsMenu() {
  const { role } = useRole();
  const isSeller = role === "seller";

  return (
    <nav
      className="settings-menu settings-menu-reference"
      aria-label="Settings"
    >
      {groups.map((group) => {
        const links = group.links.filter((l) => isSeller || !l.sellerOnly);
        if (links.length === 0) return null;

        return (
          <section className="settings-menu-group" key={group.title}>
            <p className="eyebrow">{group.title}</p>
            <ul className="settings-menu-list">
              {links.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={isSeller && link.sellerTo ? link.sellerTo : link.to}
                    className={({ isActive }) =>
                      isActive
                        ? "settings-link settings-link-active"
                        : "settings-link"
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </nav>
  );
}
