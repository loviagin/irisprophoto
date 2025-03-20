"use client";
import { useState } from "react";
import styles from "./AuthModal.module.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
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
        <FaEnvelope className={styles.inputIcon} />
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

      <button 
        type="submit" 
        className={`${styles.submitButton} ${isLoading ? styles.loading : ''}`}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </motion.form>
  );
} 