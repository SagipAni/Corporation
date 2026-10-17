import Toggle from "./Toggle.jsx";

// One row inside a toggle list: a title (and optional description) with a switch.
function ToggleRow({ title, description, checked, onChange, plain = false }) {
  return (
    <div className="toggle-row">
      <div>
        <div
          className={
            plain ? "toggle-row-title toggle-row-plain" : "toggle-row-title"
          }
        >
          {title}
        </div>
        {description && (
          <div className="toggle-row-description">{description}</div>
        )}
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

export default ToggleRow;
