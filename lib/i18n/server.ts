import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { headers } from "next/headers";

import en from "@/public/locales/en/translation.json";
import ua from "@/public/locales/ua/translation.json";
import ru from "@/public/locales/ru/translation.json";

const initI18next = async (lang: string) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(
      resourcesToBackend({
        en: { common: en },
        ua: { common: ua },
        ru: { common: ru },
      })
    )
    .init({
      lng: lang,
      fallbackLng: "ua",
      supportedLngs: ["en", "ua", "ru"],
      defaultNS: "common",
      preload: ["en", "ua", "ru"],
      ns: ["common"],
      interpolation: {
        escapeValue: false,
      },
    });
  return i18nInstance;
};

export async function createTranslation() {
  const headersList = await headers();
  const lang =
    headersList.get("accept-language")?.split(",")[0].split("-")[0] || "de";
  const i18n = await initI18next(lang);

  return {
    t: (key: string, options = {}) => {
      const translation = i18n.t(key, { ns: "common", ...options });
      return translation;
    },
  };
}
