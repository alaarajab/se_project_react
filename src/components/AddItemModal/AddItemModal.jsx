import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = { name: "", imageUrl: "", type: "" };
  const { values, handleChange, resetForm } = useForm(defaultValues);
  const [errors, setErrors] = useState({ name: "", imageUrl: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
    resetForm();
    setErrors({ name: "", imageUrl: "" });
  };

  const isSubmitDisabled =
    !values.name.trim() ||
    !values.imageUrl.trim() ||
    !!errors.name ||
    !!errors.imageUrl ||
    !values.type;

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={(e) => {
            handleChange(e);
            setErrors((prev) => ({
              ...prev,
              name: !e.target.value.trim() ? "Name is required" : "",
            }));
          }}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          name="imageUrl"
          id="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={(e) => {
            handleChange(e);
            setErrors((prev) => ({
              ...prev,
              imageUrl: !/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i.test(
                e.target.value
              )
                ? "This is not a valid image link"
                : "",
            }));
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
              name="type"
              className="modal__radio-input"
              value={type}
              checked={values.type === type}
              onChange={handleChange}
            />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
