import { useState } from "react";
import Button from "../../components/Button.jsx";
import Pill from "../../components/Pill.jsx";
import Badge from "../../components/Badge.jsx";
import Pagination from "../../components/Pagination.jsx";
import {
  userTabs,
  initialUsers,
  statusColor,
} from "../../constants/adminData.js";
import "../../styles/admin.css";

// Which users each tab shows.
const tabFilters = {
  "All(28)": () => true,
  Buyers: (user) => user.role === "Buyer",
  Sellers: (user) => user.role === "Seller",
  Admin: (user) => user.role === "Admin",
  Suspended: (user) => user.status === "Suspended",
};

function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [tab, setTab] = useState(userTabs[0]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Change one user's status (frontend-only, nothing is saved).
  function changeStatus(id, status) {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, status } : user)),
    );
  }

  const visible = users.filter((user) => {
    const text = (user.name + " " + user.detail).toLowerCase();
    return (
      tabFilters[tab](user) &&
      text.includes(search.trim().toLowerCase()) &&
      (!roleFilter || user.role === roleFilter) &&
      (!statusFilter || user.status === statusFilter)
    );
  });

  return (
    <div className="admin-page">
      <h2 className="section-title">User Management</h2>
      <p className="section-desc">
        View and suspend accounts, verify sellers, and manage roles.
      </p>

      <div className="pill-row">
        {userTabs.map((name) => (
          <Pill key={name} active={tab === name} onClick={() => setTab(name)}>
            {name}
          </Pill>
        ))}
      </div>

      <div className="filter-stack">
        <input
          className="text-input"
          type="text"
          placeholder="Search name, email or sellers ID"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="select-wrap">
          <select
            className="select-input"
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
          >
            <option value="">All roles... sellers buyers, admin</option>
            <option value="Seller">Seller</option>
            <option value="Buyer">Buyer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="select-wrap">
          <select
            className="select-input"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="">
              All statutes.. Active, pending verification, suspended
            </option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>USER</th>
              <th>ROLE</th>
              <th>STATUS</th>
              <th>JOINED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="cell-with-image">
                    <div className="avatar"></div>
                    <div>
                      <div className="cell-strong">{user.name}</div>
                      <div className="sub-text">{user.detail}</div>
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>
                  <Badge color={statusColor[user.status].replace("badge-", "")}>
                    {user.status}
                  </Badge>
                </td>
                <td>{user.joined}</td>
                <td>
                  <div className="cell-actions">
                    <Button
                      small
                      title="User details page has not been provided yet"
                    >
                      View
                    </Button>
                    {user.status === "Pending" && (
                      <Button
                        variant="solid"
                        small
                        onClick={() => changeStatus(user.id, "Active")}
                      >
                        Verify
                      </Button>
                    )}
                    {user.status === "Suspended" && (
                      <Button
                        variant="solid"
                        small
                        onClick={() => changeStatus(user.id, "Active")}
                      >
                        Reinstate
                      </Button>
                    )}
                    {user.status !== "Suspended" && (
                      <button
                        type="button"
                        className="icon-button"
                        aria-label={`Suspend ${user.name}`}
                        onClick={() => changeStatus(user.id, "Suspended")}
                      >
                        ⊘
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination summary="Showing 1–3 of 486" />
    </div>
  );
}

export default UserManagement;
