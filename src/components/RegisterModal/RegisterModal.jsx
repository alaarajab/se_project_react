import { useState, useEffect, useRef } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
  const defaultValues = { name: "", avatar: "", email: "", password: "" };
  const { values, handleChange, resetForm } = useForm(defaultValues);

  const [errors, setErrors] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
    api: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const wasOpen = useRef(false);

  // Reset form whenever the modal opens
  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      resetForm();
      setErrors({ name: "", avatar: "", email: "", password: "", api: "" });
    }
    wasOpen.current = isOpen;
  }, [isOpen, resetForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onRegister(values);
    } catch (err) {
      setErrors((prev) => ({ ...prev, api: err.message })); // ✅ show API error
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    !values.name.trim() ||
    !values.avatar.trim() ||
    !values.email.trim() ||
    !values.password.trim() ||
    !!errors.name ||
    !!errors.avatar ||
    !!errors.email ||
    !!errors.password ||
    isSubmitting;

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText={isSubmitting ? "Registering..." : "Register"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
      extraButton={
        // ✅ pass the "Or Login" button here
        <button
          type="button"
          className="modal__switch-button"
          onClick={onSwitchToLogin}
        >
          Or Login
        </button>
      }
    >
      {/* Name */}
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          required
          type="text"
          name="name"
          className="modal__input"
          id="register-name"
          placeholder="Your name"
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

      {/* Avatar */}
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          required
          type="url"
          name="avatar"
          className="modal__input"
          id="register-avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={(e) => {
            handleChange(e);
            setErrors((prev) => ({
              ...prev,
              avatar: !/^https?:\/\/.+/i.test(e.target.value)
                ? "Invalid URL format"
                : "",
            }));
          }}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>

      {/* Email */}
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          required
          type="email"
          name="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          value={values.email}
          onChange={(e) => {
            handleChange(e);
            setErrors((prev) => ({
              ...prev,
              email: !/^\S+@\S+\.\S+$/.test(e.target.value)
                ? "Invalid email"
                : "",
            }));
          }}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      {/* Password */}
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          required
          type="password"
          name="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          value={values.password}
          onChange={(e) => {
            handleChange(e);
            setErrors((prev) => ({
              ...prev,
              password:
                e.target.value.length < 6
                  ? "Password must be at least 6 characters"
                  : "",
            }));
          }}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      {/* API error */}
      {errors.api && <span className="modal__error">{errors.api}</span>}
    </ModalWithForm>
  );
};

export default RegisterModal;
