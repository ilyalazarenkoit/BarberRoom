import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/public/locales/en/translation.json";
import ua from "@/public/locales/ua/translation.json";
import ru from "@/public/locales/ru/translation.json";

// Предзагруженные ресурсы для быстрой инициализации
const resources = {
  en: { common: en },
  ua: { common: ua },
  ru: { common: ru },
};

const backend = resourcesToBackend(resources);

// Проверяем, есть ли сохраненный язык в localStorage
const getSavedLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("i18nextLng") || "ua";
  }
  return "ua";
};

i18n
  .use(HttpBackend)
  .use(backend)
  .use(LanguageDetector) // Добавляем автоопределение языка браузера
  .use(initReactI18next)
  .init({
    fallbackLng: "ua",
    supportedLngs: ["en", "ua", "ru"],
    defaultNS: "common",
    lng: getSavedLanguage(), // Используем сохраненный язык
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    // Настройки для SSR и клиентского рендеринга
    react: {
      useSuspense: false,
    },
    // Убедимся, что переводы доступны сразу
    initImmediate: false,
    // Сохраняем выбранный язык в localStorage
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
  });

// Обработчик для сохранения выбранного языка
i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("i18nextLng", lng);
  }
});

export default i18n;
