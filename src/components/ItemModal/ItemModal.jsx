import "./ItemModal.css";
import closeIcon from "../../assets/closeIcon_white.png";

function ItemModal({ activeModal, onClose, card = {} }) {
  const isOpen = activeModal === "preview";

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        {card.imageUrl ? (
          <img
            src={card.imageUrl}
            alt={card.name || "Item"}
            className="modal__image"
          />
        ) : (
          <p className="modal__no-image">No image available</p>
        )}

        <div className="modal__footer">
          <h2 className="modal__caption">{card.name || "Unnamed Item"}</h2>
          <p className="modal__weather">Weather: {card.weather || "Unknown"}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
