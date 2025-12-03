import { useState, useEffect, useRef } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const defaultValues = { email: "", password: "" };
  const { values, handleChange, resetForm } = useForm(defaultValues);

  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      resetForm();
      setErrors({ email: "", password: "" });
    }
    wasOpen.current = isOpen;
  }, [isOpen, resetForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onLogin(values);
    } catch (err) {
      console.error("Failed to login:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSubmitDisabled =
    !values.email.trim() ||
    !values.password.trim() ||
    !!errors.email ||
    !!errors.password ||
    isSubmitting;

  return (
    <ModalWithForm
      title="Login"
      name="login"
      buttonText={isSubmitting ? "Logging in..." : "Login"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
      extraButton={
        // ✅ Extra button for switching to Register modal
        <button
          type="button"
          className="modal__switch-button"
          onClick={onSwitchToRegister}
        >
          Or Sign Up
        </button>
      }
    >
      {/* Email */}
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          name="email"
          id="login-email"
          className="modal__input"
          placeholder="you@example.com"
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
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      {/* Password */}
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          name="password"
          id="login-password"
          className="modal__input"
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
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
