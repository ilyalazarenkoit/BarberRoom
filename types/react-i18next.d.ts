import "react-i18next";
import { resources } from "../lib/i18n";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof resources;
  }
}
