import { useState } from "react";
import "./Profile.css";
import SideBar from "../../components/SideBar/SideBar";
import ClothesSection from "../../components/ClothesSection/ClothesSection";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";

function Profile({
  clothingItems = [],
  onCardClick,
  onAddNewClick,
  onUpdateUser,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  return (
    <div className="profile">
      <section className="Profile__sidebar">
        <SideBar />
        <button onClick={handleEditClick} className="profile__edit-button">
          Edit Profile
        </button>
      </section>

      <section className="Profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddNewClick={onAddNewClick}
        />
      </section>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onUpdateUser={onUpdateUser} // API call to update user info
      />
    </div>
  );
}

export default Profile;
