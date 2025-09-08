import "./SideBar.css";
import avatar from "../../assets/avatar.png";
function SideBar() {
  return (
    <div className="sidebar">
      <img className="slidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__username">User name</p>
    </div>
  );
}
export default SideBar;
