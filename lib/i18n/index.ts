"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Определение типа ресурсов для типизации
export const resources = {
  ua: {
    translation: {},
  },
  ru: {
    translation: {},
  },
  en: {
    translation: {},
  },
} as const;

// Инициализация i18next
i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ua",
    supportedLngs: ["ua", "ru", "en"],
    debug: process.env.NODE_ENV !== "production",
    interpolation: {
      escapeValue: false, // не нужно для React, так как он экранирует по умолчанию
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["cookie", "localStorage", "navigator", "htmlTag"],
      caches: ["cookie", "localStorage"],
    },
  });

export default i18next;
