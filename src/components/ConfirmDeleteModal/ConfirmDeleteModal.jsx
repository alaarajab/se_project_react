import "./ConfirmDeleteModal.css";
import closeIcon from "../../assets/closeIcon_gray.png";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal">
      <div className="confirm-modal__content">
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="confirm-modal__close"
        >
          <img
            src={closeIcon}
            alt="Close"
            className="confirm-modal__close-icon"
          />
        </button>

        <div className="confirm-modal__text">
          <h2 className="confirm-modal__title">
            Are you sure you want to delete this item?
          </h2>
          <p className="confirm-modal__subtitle">
            This action is irreversible.
          </p>
        </div>

        <div className="confirm-modal__buttons">
          <button className="confirm-modal__delete-btn" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="confirm-modal__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
