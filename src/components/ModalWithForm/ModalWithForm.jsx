import "./ModalWithForm.css";
import closeIcon from "../../assets/closeIcon_gray.png";

function ModalWithForm({
  children,
  name,
  buttonText = "Save",
  title,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled = false,
  extraButton, // ✅ added extraButton prop
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content_form">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" className="modal__close-icoForm" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          {/* ✅ Buttons row: submit + extra button */}
          <div className="modal__button-row">
            <button
              type="submit"
              disabled={isSubmitDisabled}
              className={`modal__submit ${
                !isSubmitDisabled ? "modal__submit_ready" : ""
              }`}
            >
              {buttonText}
            </button>

            {extraButton && extraButton}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
