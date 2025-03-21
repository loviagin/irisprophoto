"use client";
import { useState } from "react";
import styles from "./AuthModal.module.css";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

interface RegisterFormProps {
  onSubmit: (data: { email: string; password: string; confirmPassword: string }) => void;
  isLoading?: boolean;
}

export default function RegisterForm({ onSubmit, isLoading = false }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      newErrors.password = validatePassword(formData.password);
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Очищаем ошибку при вводе
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={styles.form}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className={styles.inputGroup}>
        <FaUser className={styles.inputIcon} />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={isLoading}
          className={errors.email ? styles.inputError : ""}
        />
        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
      </div>

      <div className={styles.inputGroup}>
        <FaLock className={styles.inputIcon} />
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          disabled={isLoading}
          className={errors.password ? styles.inputError : ""}
        />
        <button
          type="button"
          className={styles.togglePassword}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
      </div>

      <div className={styles.inputGroup}>
        <FaLock className={styles.inputIcon} />
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          disabled={isLoading}
          className={errors.confirmPassword ? styles.inputError : ""}
        />
        <button
          type="button"
          className={styles.togglePassword}
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
        {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
      </div>

      <div className={styles.passwordRequirements}>
        <p>Password requirements:</p>
        <ul>
          <li className={formData.password.length >= 6 ? styles.valid : ""}>
            Minimum 6 characters
          </li>
          <li className={/[A-Z]/.test(formData.password) ? styles.valid : ""}>
            At least one uppercase letter
          </li>
          <li className={/[a-z]/.test(formData.password) ? styles.valid : ""}>
            At least one lowercase letter
          </li>
          <li className={/[0-9]/.test(formData.password) ? styles.valid : ""}>
            At least one number
          </li>
        </ul>
      </div>

      <button 
        type="submit" 
        className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
        disabled={isLoading}
      >
        {isLoading ? "Registration..." : "Register"}
      </button>
    </motion.form>
  );
} 