// A white card with a label and a big number.
// By default the label is above the number; use valueFirst to flip it.
function StatCard({ label, value, valueFirst = false }) {
  return (
    <div
      className={valueFirst ? "stat-card stat-card-value-first" : "stat-card"}
    >
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}

export default StatCard;
