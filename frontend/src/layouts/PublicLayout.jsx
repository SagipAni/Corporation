import { Outlet } from "react-router-dom";

// Layout for public pages (Landing, Login, Sign-up). No sidebar.
function PublicLayout() {
  return <Outlet />;
}

export default PublicLayout;
