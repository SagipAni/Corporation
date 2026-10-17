// A small colored pill. color: "red" | "amber" | "green"
function Badge({ color = "red", children }) {
  return <span className={`badge badge-${color}`}>{children}</span>;
}

export default Badge;
