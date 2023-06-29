import logo from "../logo.svg";
import "./Header.css";

export default function Header() {
  return (
    <div className="header radio">
      <div className="header-logo-wrapper">
        <img src={logo} className="header-logo" alt="" />
      </div>
      <div className="header-text">
        <h1>SK Radio Player</h1>
        <h2>Choose genre, station and start listening</h2>
      </div>
    </div>
  );
}
