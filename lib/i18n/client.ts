"use client";

import i18n from "./i18n";
import { useEffect } from "react";

export function useClientI18n() {
  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.init();
    }
  }, []);

  return i18n;
}

export default i18n;
