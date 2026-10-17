import { Navigate, Outlet } from "react-router-dom";
import { useRole } from "../context/RoleContext.jsx";
import { roleHome } from "../constants/roles.js";

// Wraps a group of routes. Only the listed roles may see them.
//   no role yet        -> go to /login
//   wrong role         -> go to that role's own dashboard
//   allowed role       -> show the routes inside
// This only protects the UI. Real protection must be done by the backend.
function ProtectedRoute({ allowedRoles }) {
  const { role } = useRole();

  if (!role) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) {
    return <Navigate to={roleHome[role]} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
