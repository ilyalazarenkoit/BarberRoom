"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useClientI18n } from "@/lib/i18n/client";

export const LanguageSwitcher = () => {
  const [currentLang, setCurrentLang] = useState("ua");
  const [isOpen, setIsOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialize client-side i18n
  useClientI18n();

  useEffect(() => {
    setCurrentLang(i18n.language || "ua");

    const handleLanguageChanged = (lng: string) => {
      setCurrentLang(lng);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const languages = {
    ua: t("language.ua", "Українська"),
    ru: t("language.ru", "Русский"),
    en: t("language.en", "English"),
  };

  const languageCodes = {
    ua: "UA",
    ru: "RU",
    en: "EN",
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-8 w-8 md:h-9 md:w-9 rounded-lg bg-white border-2 border-[#0B322F] text-[#0B322F] font-medium"
        whileHover={{ backgroundColor: "rgba(11, 50, 47, 0.05)" }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        aria-label={t("header.changeLanguage", "Change language")}
        aria-expanded={isOpen}
      >
        {languageCodes[currentLang as keyof typeof languageCodes]}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-md overflow-hidden z-50 min-w-[120px]"
          >
            {Object.entries(languages).map(([code, label]) => (
              <motion.button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200 ${
                  currentLang === code
                    ? "font-bold text-[#0B322F]"
                    : "text-gray-700"
                }`}
                whileHover={{ backgroundColor: "rgba(11, 50, 47, 0.05)" }}
                whileTap={{ scale: 0.98 }}
              >
                {label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
