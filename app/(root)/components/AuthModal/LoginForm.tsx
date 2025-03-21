"use client";
import { useState, useEffect } from "react";
import styles from "./AuthModal.module.css";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaPhone, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getAuth } from "firebase/auth";
import firebase from "@/app/firebase/firebase";
import { PatternFormat } from 'react-number-format';

interface LoginFormProps {
  onSubmit: (data: { email: string; password: string } | { phoneNumber: string }) => void;
  isLoading?: boolean;
}

export default function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    verificationCode: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    verificationCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isPhoneAuth, setIsPhoneAuth] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [verificationSent, setVerificationSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const auth = getAuth(firebase);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendTimer]);

  const formatPhoneNumber = (value: string) => {
    // Всегда начинаем с +1
    if (!value.startsWith('+1')) {
      value = '+1' + value.replace(/[^\d]/g, '');
    }
    return value;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    // Очищаем номер от всех символов кроме цифр и +
    const cleanPhone = phone.replace(/[^\d+]/g, '');
    // Проверяем, что номер начинается с +1 и содержит 10 цифр после +1
    const isValid = /^\+1\d{10}$/.test(cleanPhone);
    return isValid;
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      phoneNumber: "",
      verificationCode: "",
    };

    if (isPhoneAuth) {
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "A phone number is required";
      } else if (!validatePhoneNumber(formData.phoneNumber)) {
        newErrors.phoneNumber = "Enter the correct phone number";
      }
      if (verificationSent && !formData.verificationCode) {
        newErrors.verificationCode = "Enter the confirmation code";
      }
    } else {
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!validateEmail(formData.email)) {
        newErrors.email = "Enter a valid email";
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => !error);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          setErrors(prev => ({
            ...prev,
            phoneNumber: "Session expired. Please try again.",
          }));
        }
      });
    }
    return window.recaptchaVerifier;
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!verificationSent) {
      setIsSendingCode(true);
      try {
        const appVerifier = setupRecaptcha();
        // Используем номер как есть, так как он уже отформатирован
        const confirmation = await signInWithPhoneNumber(auth, formData.phoneNumber, appVerifier);
        setConfirmationResult(confirmation);
        setVerificationSent(true);
        setResendTimer(60);
      } catch (error) {
        console.error('Error sending verification code:', error);
        if (window.recaptchaVerifier) {
          window.recaptchaVerifier.clear();
          delete window.recaptchaVerifier;
        }
        const oldContainer = document.getElementById('recaptcha-container');
        if (oldContainer) {
          oldContainer.innerHTML = '';
        }
        
        setErrors(prev => ({
          ...prev,
          phoneNumber: "Error sending code. Please try again later.",
        }));
      } finally {
        setIsSendingCode(false);
      }
    } else {
      try {
        if (!confirmationResult) {
          throw new Error('Confirmation object is missing');
        }
        const userCredential = await confirmationResult.confirm(formData.verificationCode);
        if (userCredential.user) {
          onSubmit({ phoneNumber: formData.phoneNumber });
        }
      } catch (error) {
        console.error('Error confirming code:', error);
        setErrors(prev => ({
          ...prev,
          verificationCode: "Invalid confirmation code",
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPhoneAuth) {
      handlePhoneSubmit(e);
    } else if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'phoneNumber') {
      newValue = formatPhoneNumber(value);
    }

    if (name === 'verificationCode') {
      newValue = value.replace(/\D/g, '').slice(0, 6);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleResendCode = () => {
    if (resendTimer === 0) {
      setVerificationSent(false);
      handlePhoneSubmit(new Event('submit') as any);
    }
  };

  const handlePhoneNumberChange = (values: any) => {
    const { formattedValue, value } = values;
    // Сохраняем форматированное значение
    setFormData(prev => ({
      ...prev,
      phoneNumber: formattedValue
    }));
    setErrors(prev => ({
      ...prev,
      phoneNumber: ""
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
      <div className={styles.authToggle}>
        <button
          type="button"
          onClick={() => {
            setIsPhoneAuth(false);
            setErrors({email: "", password: "", phoneNumber: "", verificationCode: ""});
          }}
          className={`${styles.toggleButton} ${!isPhoneAuth ? styles.active : ''}`}
        >
          Email
        </button>
        <button
          type="button"
          onClick={() => {
            setIsPhoneAuth(true);
            setErrors({email: "", password: "", phoneNumber: "", verificationCode: ""});
          }}
          className={`${styles.toggleButton} ${isPhoneAuth ? styles.active : ''}`}
        >
          Phone
        </button>
      </div>

      {isPhoneAuth ? (
        <>
          <div className={styles.inputGroup}>
            <FaPhone className={styles.inputIcon} />
            <PatternFormat
              format="+1 (###) ###-####"
              value={formData.phoneNumber}
              onValueChange={handlePhoneNumberChange}
              name="phoneNumber"
              type="tel"
              placeholder="+1 (555) 555-5555"
              customInput={motion.input}
              required
              disabled={isLoading || verificationSent}
              className={errors.phoneNumber ? styles.inputError : ""}
              mask="_"
              allowEmptyFormatting
              valueIsNumericString={false}
            />
            {errors.phoneNumber && <span className={styles.errorMessage}>{errors.phoneNumber}</span>}
          </div>

          <div id="recaptcha-container"></div>

          {verificationSent && (
            <>
              <div className={styles.inputGroup}>
                <PatternFormat
                  format="######"
                  value={formData.verificationCode}
                  onValueChange={(values) => {
                    setFormData(prev => ({
                      ...prev,
                      verificationCode: values.value
                    }));
                    setErrors(prev => ({
                      ...prev,
                      verificationCode: ""
                    }));
                  }}
                  name="verificationCode"
                  type="text"
                  placeholder="Confirmation code"
                  customInput={motion.input}
                  required
                  disabled={isLoading}
                  className={errors.verificationCode ? styles.inputError : ""}
                  allowEmptyFormatting
                  mask="_"
                />
                {errors.verificationCode && (
                  <span className={styles.errorMessage}>{errors.verificationCode}</span>
                )}
              </div>
              {resendTimer > 0 ? (
                <p className={styles.resendTimer}>
                  Resend code in {resendTimer} seconds
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendCode}
                  className={styles.resendButton}
                  disabled={isLoading || isSendingCode}
                >
                  Resend code
                </button>
              )}
            </>
          )}
        </>
      ) : (
        <>
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
        </>
      )}

      <button 
        type="submit" 
        className={`${styles.submitButton} ${(isLoading || isSendingCode) ? styles.loading : ''}`}
        disabled={isLoading || isSendingCode}
      >
        {isLoading || isSendingCode ? (
          <>
            <FaSpinner className={styles.spinner} />
            {isPhoneAuth 
              ? (verificationSent ? "Checking..." : "Sending code...") 
              : "Logging in..."}
          </>
        ) : (
          isPhoneAuth 
            ? (verificationSent ? "Confirm code" : "Get code")
            : "Login"
        )}
      </button>
    </motion.form>
  );
} 