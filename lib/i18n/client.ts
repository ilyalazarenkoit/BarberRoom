"use client";

import { useEffect, useState } from "react";
import i18next from "./index";
import { useTranslation as useTranslationOrg } from "react-i18next";
import { TFunction } from "i18next";

export function useTranslation() {
  const [loaded, setLoaded] = useState(false);
  const ret = useTranslationOrg();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return {
    ...ret,
    t: loaded
      ? ret.t
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (((key: string, ...rest: unknown[]) => key) as unknown as TFunction),
    ready: loaded && ret.ready,
  };
}

export function changeLanguage(lng: string) {
  return i18next.changeLanguage(lng);
}

export function getLanguage() {
  return i18next.language || "ua";
}

export default i18next;
