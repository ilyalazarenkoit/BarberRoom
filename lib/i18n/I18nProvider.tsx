"use client";

import { ReactNode, useEffect } from "react";
import i18next from "./index";

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // Инициализация i18n на клиенте
    const handleLanguageChanged = () => {
      document.documentElement.lang = i18next.language;
      document.documentElement.dir = i18next.dir();
    };

    i18next.on("languageChanged", handleLanguageChanged);

    // Установка начального языка
    handleLanguageChanged();

    return () => {
      i18next.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  return <>{children}</>;
}

export default I18nProvider;
