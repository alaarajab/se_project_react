import ModalWithForm from "../ModalWithForm/ModalWithForm";
const AddItemModal = ({
  isOpen,
  onSubmit,
  onClose,
  name,
  setName,
  imageUrl,
  setImageUrl,
  weather,
  setWeather,
  errors,
  setErrors,
  isValidImageUrl,
}) => {
  // ...

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: "" }));
          }}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
            if (!isValidImageUrl(e.target.value)) {
              setErrors((prev) => ({
                ...prev,
                imageUrl: "This is not a valid image link",
              }));
            } else {
              setErrors((prev) => ({ ...prev, imageUrl: "" }));
            }
          }}
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              id={type}
              type="radio"
              name="weather"
              className="modal__radio-input"
              checked={weather === type}
              onChange={() => setWeather(type)}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
