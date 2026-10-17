// Simple line icons for the "Built for Farmers" feature cards.
// They use currentColor, so the card's text color controls the icon color.

const iconProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

export function ConnectIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="20" cy="17" r="7" />
      <path d="M7 38c0-7.5 5.8-13 13-13s13 5.5 13 13" />
      <circle cx="44" cy="17" r="7" />
      <path d="M31 38c0-7.5 5.8-13 13-13s13 5.5 13 13" />
      <path d="M10 53h44" />
      <path d="M17 47l-7 6 7 6" />
      <path d="M47 47l7 6-7 6" />
    </svg>
  );
}

export function ScaleIcon() {
  return (
    <svg {...iconProps}>
      <path d="M32 8v44" />
      <path d="M18 54h28" />
      <path d="M10 18h44" />
      <path d="M10 18L2 36h16z" />
      <path d="M54 18l-8 18h16z" />
      <circle cx="32" cy="8" r="2" />
    </svg>
  );
}

export function GroupIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="32" cy="20" r="7" />
      <path d="M19 46c0-8 5.8-14 13-14s13 6 13 14" />
      <circle cx="13" cy="26" r="5" />
      <path d="M3 46c0-6 4-10 10-10" />
      <circle cx="51" cy="26" r="5" />
      <path d="M61 46c0-6-4-10-10-10" />
    </svg>
  );
}
