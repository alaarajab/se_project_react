import "./Profile.css";
import SideBar from "../../components/SideBar/SideBar";
import ClothesSection from "../../components/ClothesSection/ClothesSection";

function Profile({ clothingItems = [], onCardClick, onAddNewClick }) {
  return (
    <div className="profile">
      <section className="Profile__sidebar">
        <SideBar />
      </section>
      <section className="Profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddNewClick={onAddNewClick}
        />
      </section>
    </div>
  );
}

export default Profile;
