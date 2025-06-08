"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import i18next from "../app/i18n";

export const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState("ua");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentLang(i18next.language || "ua");

    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng);
    };

    i18next.on("languageChanged", handleLanguageChanged);

    return () => {
      i18next.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  const changeLanguage = (lng: string) => {
    i18next.changeLanguage(lng);
    setIsOpen(false);
  };

  const languages = {
    ua: "UA",
    ru: "RU",
    en: "EN",
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-8 w-8 md:h-9 md:w-9 rounded-lg bg-white border-2 border-[#0B322F] text-[#0B322F] font-medium"
        whileHover={{ backgroundColor: "rgba(11, 50, 47, 0.05)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label="Change language"
      >
        {languages[currentLang as keyof typeof languages]}
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md overflow-hidden z-50"
        >
          {Object.entries(languages).map(([code, label]) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                currentLang === code
                  ? "font-bold text-[#0B322F]"
                  : "text-gray-700"
              }`}
            >
              {label}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};
