import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/public/locales/en/translation.json";
import de from "@/public/locales/de/translation.json";
import fr from "@/public/locales/fr/translation.json";
import ua from "@/public/locales/ua/translation.json";
import ru from "@/public/locales/ru/translation.json";

const resources = {
  en: { common: en },
  de: { common: de },
  fr: { common: fr },
  ua: { common: ua },
  ru: { common: ru },
};

const backend = resourcesToBackend(resources);

const getSavedLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("i18nextLng") || "en";
  }
  return "en";
};

i18n
  .use(HttpBackend)
  .use(backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "de", "fr", "ua", "ru"],
    defaultNS: "common",
    lng: getSavedLanguage(),
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: false,
    },
    initImmediate: false,
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
  });

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("i18nextLng", lng);
  }
});

export default i18n;
