import logo from "../assets/sagipani_logo_cropped.png";

// Small "Sagip Ani" logo pill shown at the top of the login and sign-up pages.
function LogoPill() {
  return (
    <div className="logo-pill">
      <img src={logo} alt="" />
      <span>Sagip Ani</span>
    </div>
  );
}

export default LogoPill;
