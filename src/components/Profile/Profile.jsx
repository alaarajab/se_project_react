import { useState, useContext } from "react";
import "./Profile.css";
import SideBar from "../../components/SideBar/SideBar";
import ClothesSection from "../../components/ClothesSection/ClothesSection";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({
  clothingItems = [],
  onCardClick,
  onCardLike,
  onAddNewClick,
  onUpdateUser,
  handleLogout,
  onEditProfileClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="Profile__sidebar">
        <SideBar />
        <button onClick={onEditProfileClick} className="profile__edit-button">
          Change profile data
        </button>
        <button onClick={handleLogout} className="profile__logout-button">
          Log Out
        </button>
      </section>

      <section className="Profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          currentUser={currentUser}
          onCardClick={onCardClick}
          onAddNewClick={onAddNewClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
