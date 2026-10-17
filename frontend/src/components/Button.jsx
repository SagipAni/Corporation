import { Link } from "react-router-dom";

// A pill-shaped button. Pass `to` to make it an internal link.
// variant: "outline" | "solid" | "danger"
function Button({
  to,
  variant = "outline",
  small = false,
  upper = false,
  block = false,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    small ? "btn-sm" : "",
    upper ? "btn-upper" : "",
    block ? "btn-block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;
