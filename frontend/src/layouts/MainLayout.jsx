import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import "../styles/layout.css";
import "../styles/components.css";

// Shared layout for every logged-in page (shared, seller, buyer and admin).
// The Sidebar and Header are rendered here, once. Pages only fill the <Outlet />.
function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="main-layout">
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <div className="main-area">
        <Header onMenuClick={() => setMenuOpen((open) => !open)} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
