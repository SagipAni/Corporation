// A pill-shaped filter / tab button.
function Pill({ active = false, onClick, children }) {
  return (
    <button
      type="button"
      className={active ? "pill pill-active" : "pill"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Pill;
