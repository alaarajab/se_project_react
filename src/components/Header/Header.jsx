import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  handleRegisterClick,
  handleLoginClick,
  weatherData,
  loggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="App logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      <div className="header__right">
        <ToggleSwitch />
        {loggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + add clothes
            </button>

            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">
                  {currentUser?.name || "User"}
                </p>
                <img
                  src={currentUser?.avatar || avatar}
                  alt="User avatar"
                  className="header__avatar"
                />
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              className="header__button"
              type="button"
              onClick={handleLoginClick}
            >
              Login
            </button>
            <button
              className="header__button"
              type="button"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
