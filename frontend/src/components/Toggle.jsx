// An on/off switch. The parent keeps the `checked` value.
function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={checked ? "toggle toggle-on" : "toggle"}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle-knob"></span>
    </button>
  );
}

export default Toggle;
