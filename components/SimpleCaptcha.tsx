"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SimpleCaptchaProps {
  onSuccess: () => void;
  onFailure?: () => void;
  className?: string;
}

const SimpleCaptcha: React.FC<SimpleCaptchaProps> = ({
  onSuccess,
  onFailure,
  className,
}) => {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  // Generate new numbers for captcha
  const generateNewNumbers = () => {
    setFirstNumber(Math.floor(Math.random() * 10) + 1);
    setSecondNumber(Math.floor(Math.random() * 10) + 1);
    setUserAnswer("");
    setError(null);
  };

  // Initialize captcha on first load
  useEffect(() => {
    generateNewNumbers();
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const correctAnswer = firstNumber + secondNumber;
    const userAnswerNum = parseInt(userAnswer, 10);

    if (isNaN(userAnswerNum)) {
      setError("Будь ласка, введіть число");
      return;
    }

    if (userAnswerNum === correctAnswer) {
      // Successful captcha completion
      onSuccess();
    } else {
      // Incorrect answer
      setError("Неправильна відповідь, спробуйте ще раз");
      setAttempts((prev) => prev + 1);

      // Generate new numbers after 3 failed attempts
      if (attempts >= 2) {
        generateNewNumbers();
        setAttempts(0);

        if (onFailure) {
          onFailure();
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`p-4 bg-white rounded-lg shadow-sm ${className}`}
    >
      <h4 className="text-sm font-medium text-gray-700 mb-3">
        Підтвердіть, що ви не робот
      </h4>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex items-center justify-center mb-3">
          <span className="text-lg font-medium text-[#0B322F]">
            {firstNumber}
          </span>
          <span className="mx-2 text-lg">+</span>
          <span className="text-lg font-medium text-[#0B322F]">
            {secondNumber}
          </span>
          <span className="mx-2 text-lg">=</span>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => {
              // Allow only digits
              const value = e.target.value.replace(/[^\d]/g, "");
              setUserAnswer(value);
              setError(null);
            }}
            className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#0B322F] focus:border-transparent"
            maxLength={2}
            autoFocus
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 mb-2 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-[#0B322F] text-white text-sm rounded-md hover:bg-opacity-90 transition-all"
        >
          Підтвердити
        </button>
      </form>
    </motion.div>
  );
};

export default SimpleCaptcha;
