import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection() {
  return (
    <div className="clothes-section">
      <div>
        <p>Your Items</p>
        <button>+ Add New</button>
      </div>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => (
          <ItemCard
            key={item._id || item.id}
            item={item}
            //onCardClick={handleCardClick}
          />
        ))}
      </ul>
    </div>
  );
}
export default ClothesSection;
