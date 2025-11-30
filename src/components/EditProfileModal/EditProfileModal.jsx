import { useState, useEffect, useRef, useContext } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const defaultValues = {
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  };

  const { values, handleChange, resetForm } = useForm(defaultValues);

  const [errors, setErrors] = useState({ name: "", avatar: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const wasOpen = useRef(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      resetForm(defaultValues);
      setErrors({ name: "", avatar: "" });
    }
    wasOpen.current = isOpen;
  }, [isOpen, resetForm, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onUpdateUser(values);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    !values.name.trim() ||
    !values.avatar.trim() ||
    !!errors.name ||
    !!errors.avatar ||
    isSubmitting;

  return (
    <ModalWithForm
      title="Edit Profile"
      name="edit-profile"
      buttonText={isSubmitting ? "Saving changes..." : "Save changes"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      {/* Name */}
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          id="name"
          className="modal__input"
          placeholder="Your name"
          value={values.name}
          onChange={(e) => {
            handleChange(e);
            setErrors((prev) => ({
              ...prev,
              name:
                e.target.value.trim().length < 2
                  ? "Name must be at least 2 characters"
                  : "",
            }));
          }}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      {/* Avatar URL */}
      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          name="avatar"
          id="avatar"
          className="modal__input"
          placeholder="https://example.com/avatar.jpg"
          value={values.avatar}
          onChange={(e) => {
            handleChange(e);
            setErrors((prev) => ({
              ...prev,
              avatar: !/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(
                e.target.value
              )
                ? "Enter a valid image URL"
                : "",
            }));
          }}
          required
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
