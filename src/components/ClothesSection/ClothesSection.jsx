import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  currentUser,
  onCardClick,
  onAddNewClick,
  onCardLike,
  loggedIn,
}) {
  //Filter items belonging to the logged-in user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your Items</p>
        <button className="clothes-section__btn" onClick={onAddNewClick}>
          + Add New
        </button>
      </div>

      <ul className="clothes-section__items">
        {userItems.map((item) => (
          <ItemCard
            key={item._id ?? item.id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            loggedIn={loggedIn}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
