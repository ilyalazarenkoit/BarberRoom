"use client";

import i18n from "./i18n";
import { useEffect } from "react";

// Этот хук инициализирует i18next на клиенте
export function useClientI18n() {
  useEffect(() => {
    // Проверяем, что i18next уже не инициализирован
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return i18n;
}

// Экспортируем i18n для прямого использования
export default i18n;
