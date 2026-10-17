import { Link } from "react-router-dom";
import StatCard from "../../components/StatCard.jsx";
import Badge from "../../components/Badge.jsx";
import Button from "../../components/Button.jsx";
import {
  dashboardStats,
  dashboardModules,
  needsAttention,
  recentActivity,
} from "../../constants/adminData.js";
import "../../styles/admin.css";

function AdminDashboard() {
  return (
    <div className="admin-page">
      <h2 className="dashboard-lead">Here is what needs you today.</h2>

      <div className="dashboard-grid">
        <section>
          <div className="stat-grid-2">
            {dashboardStats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                valueFirst
              />
            ))}
          </div>

          <p className="eyebrow" style={{ margin: "32px 0 0" }}>
            MODULES
          </p>
          <div className="module-list">
            {dashboardModules.map((module) => (
              <Link key={module.title} to={module.path} className="module-row">
                <div>
                  <div className="module-title">{module.title}</div>
                  <div className="module-desc">{module.description}</div>
                </div>
                <Badge color="red">{module.badge}</Badge>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <div className="list-card">
            <h3 className="card-title">Needs attention</h3>
            {needsAttention.map((item) => (
              <div key={item.title} className="list-item">
                <div>
                  <div className="list-item-title">{item.title}</div>
                  <div className="list-item-detail">{item.detail}</div>
                </div>
                <Button to={item.path} small>
                  Open
                </Button>
              </div>
            ))}
          </div>

          <div className="list-card">
            <h3 className="card-title">Recent activity</h3>
            {recentActivity.map((item) => (
              <div key={item.title} className="list-item">
                <div>
                  <div className="list-item-title">{item.title}</div>
                  <div className="list-item-detail">{item.detail}</div>
                </div>
                <span className="list-item-detail">{item.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
