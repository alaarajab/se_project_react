import "./Profile.css";
import SideBar from "../../components/SideBar/SideBar";
import ClothesSection from "../../components/ClothesSection/ClothesSection";

function Profile({ onCardClick }) {
  return (
    <div className="profile">
      <section className="Profile__sidebar">
        <SideBar />
      </section>
      <section className="Profile__clothing-items">
        <ClothesSection onCardClick={onCardClick} />
      </section>
    </div>
  );
}

export default Profile;
