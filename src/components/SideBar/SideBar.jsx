import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <img
        className="sidebar__avatar"
        src={currentUser?.avatar || avatar}
        alt={currentUser?.name || "User"}
      />
      <p className="sidebar__username">{currentUser?.name || "User"}</p>
    </div>
  );
}

export default SideBar;
