import "./Header.css";
import logo from "../../assets/";
import avatar from "../../assets/avatar.png";

function Header() {
  return (
    <header className="header">
      <img className="header__image" />
      <p className="header__date-and-location">Date and Location</p>
      <button className="header__add-clothes-btn">+ add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Name</p>
        <img src={avatar} alt="" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
