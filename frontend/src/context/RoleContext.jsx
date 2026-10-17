import { createContext, useContext, useState } from "react";
import { ROLES } from "../constants/roles.js";

// TEMPORARY, frontend-only role. This is NOT real authentication.
// The real check must happen on the Express server later.

const RoleContext = createContext(null);
const STORAGE_KEY = "sagipRole";

function readSavedRole() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return ROLES.includes(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function RoleProvider({ children }) {
  const [role, setRoleState] = useState(readSavedRole);

  function setRole(newRole) {
    setRoleState(newRole);
    try {
      if (newRole) localStorage.setItem(STORAGE_KEY, newRole);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Storage can be blocked; the role then just lasts until refresh.
    }
  }

  function logout() {
    setRole(null);
  }

  return (
    <RoleContext.Provider value={{ role, setRole, logout }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  return useContext(RoleContext);
}
