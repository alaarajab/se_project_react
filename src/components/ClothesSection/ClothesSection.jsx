import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your Items</p>
        <button>+ Add New</button>
      </div>

      <ul className="clothes-section__items">
        {defaultClothingItems.map((item) => (
          <ItemCard
            key={item._id || item.id} // ✅ key goes here, on the component used in the list
            item={item}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
