"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Percent } from "phosphor-react";

interface DiscountButtonProps {
  onClick: () => void;
}

const DiscountButton: React.FC<DiscountButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <motion.button
      className={`fixed z-30 bg-[#0B322F] hover:bg-[#0d4541] border-white border-2 text-white rounded-md shadow-xl flex items-center justify-center ${
        isMobile
          ? "bottom-10 right-4 p-3 shadow-lg"
          : "bottom-12 right-6 p-4 shadow-xl"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: [1, 1.03, 1],
        boxShadow: [
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        ],
      }}
      transition={{
        duration: 0.3,
        scale: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        },
        boxShadow: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut",
        },
      }}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={`relative ${isMobile ? "mr-1" : "mr-2"}`}>
          <Percent className={isMobile ? "h-5 w-5" : "h-6 w-6"} weight="bold" />
        </div>
        <motion.span
          className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}
          animate={{ y: [0, -1, 0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          {t("discountButton.getDiscount")}
        </motion.span>
      </div>
    </motion.button>
  );
};

export default DiscountButton;
