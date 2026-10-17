import { Link, useLocation, useNavigate } from "react-router-dom";
import { navByRole, isItemActive } from "../constants/navItems.js";
import { navIcons } from "./NavIcons.jsx";
import { useRole } from "../context/RoleContext.jsx";

// The one and only sidebar. It is rendered once, by MainLayout.
// The menu comes from constants/navItems.js and depends on the current role.
function Sidebar({ isOpen, onClose }) {
  const { role, logout } = useRole();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const nav = navByRole[role] || { badge: null, main: [], footer: [] };

  function handleLogout() {
    logout();
    onClose();
    navigate("/login");
  }

  function renderItem(item) {
    if (item.action === "logout") {
      return (
        <button
          key={item.label}
          type="button"
          className="nav-link"
          onClick={handleLogout}
        >
          {navIcons[item.icon]}
          <span>{item.label}</span>
        </button>
      );
    }

    const active = isItemActive(item, pathname);
    return (
      <Link
        key={item.label}
        to={item.path}
        className={active ? "nav-link active" : "nav-link"}
        aria-current={active ? "page" : undefined}
        onClick={onClose}
      >
        {navIcons[item.icon]}
        <span>{item.label}</span>
        {active && <span className="nav-chevron">›</span>}
      </Link>
    );
  }

  return (
    <aside className={isOpen ? "sidebar sidebar-open" : "sidebar"}>
      <div className="sidebar-brand">
        <p className="sidebar-logo">SAGIP ANI</p>
        {nav.badge && <span className="sidebar-badge">{nav.badge}</span>}
      </div>

      <nav className="sidebar-nav" aria-label="Main menu">
        {nav.main.map(renderItem)}
      </nav>

      {nav.footer.length > 0 && (
        <nav className="sidebar-footer" aria-label="Account">
          {nav.footer.map(renderItem)}
        </nav>
      )}
    </aside>
  );
}

export default Sidebar;
