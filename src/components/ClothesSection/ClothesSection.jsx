import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ clothingItems, onCardClick, onAddNewClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your Items</p>
        <button className="clothes-section__btn" onClick={onAddNewClick}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {(clothingItems || []).map((item) => (
          <ItemCard
            key={item._id ?? item.id}
            item={item}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
