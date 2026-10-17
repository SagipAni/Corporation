import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button.jsx";
import { pageTitles } from "../constants/pageTitles.js";
import { roleHome } from "../constants/roles.js";
import { useRole } from "../context/RoleContext.jsx";

// The shared header. It is rendered once, by MainLayout.
function Header({ onMenuClick }) {
  const { role, logout } = useRole();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const title = pageTitles[pathname] || "";
  const isProfilePage = pathname === "/profile";

  // Go back one page inside the app, or to the role's home if there is none.
  function goBack() {
    const canGoBack = window.history.state && window.history.state.idx > 0;
    if (canGoBack) navigate(-1);
    else navigate(roleHome[role] || "/");
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="page-header">
      <div className="header-left">
        <button
          type="button"
          className="menu-button"
          aria-label="Open or close the menu"
          onClick={onMenuClick}
        >
          ☰
        </button>
        {title && <h1 className="page-title">{title}</h1>}
      </div>

      <div className="header-right">
        {role === "admin" ? (
          <>
            <span>Logged in as</span>
            <Button to="/profile" upper>
              PROFILE
            </Button>
          </>
        ) : (
          <>
            {role === "seller" && (
              <span className="header-role-tag">SELLER</span>
            )}
            <div className="header-avatar" aria-hidden="true"></div>
            {isProfilePage ? (
              <Button upper onClick={handleLogout}>
                LOG OUT
              </Button>
            ) : (
              <Button upper onClick={goBack}>
                BACK
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
