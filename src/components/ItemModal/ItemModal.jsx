import { useState } from "react";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import "./ItemModal.css";
import closeIcon from "../../assets/closeIcon_white.png";

function ItemModal({ activeModal, onClose, card = {}, onDeleteItem }) {
  const isOpen = activeModal === "preview";
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleDeleteClick = () => setIsConfirmOpen(true);
  const handleConfirmDelete = () => {
    onDeleteItem(card._id);
    setIsConfirmOpen(false);
    onClose(); // optionally close the main modal after deletion
  };

  return (
    <>
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
            <div className="modal__caption-container">
              <h2 className="modal__caption">{card.name || "Unnamed Item"}</h2>
              <button
                className="modal__delete-button"
                onClick={handleDeleteClick}
              >
                Delete Item
              </button>
            </div>
            <p className="modal__weather">
              Weather: {card.weather || "Unknown"}
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default ItemModal;
