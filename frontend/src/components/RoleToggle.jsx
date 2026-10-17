// The Buyer | Seller switch at the top of the login and sign-up forms.
function RoleToggle({ value, onChange }) {
  return (
    <div className="role-toggle" role="group" aria-label="Account type">
      <button
        type="button"
        className={
          value === "buyer" ? "role-option role-active" : "role-option"
        }
        aria-pressed={value === "buyer"}
        onClick={() => onChange("buyer")}
      >
        Buyer
      </button>
      <button
        type="button"
        className={
          value === "seller" ? "role-option role-active" : "role-option"
        }
        aria-pressed={value === "seller"}
        onClick={() => onChange("seller")}
      >
        Seller
      </button>
    </div>
  );
}

export default RoleToggle;
