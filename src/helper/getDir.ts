import { TLang } from "../langs/allowedLangs";

export const getDir = (lang: TLang): "ltr" | "rtl" => {
  const RTL_LANGS = ["ar", "ur"];
  if (RTL_LANGS.includes(lang)) return "rtl";
  return "ltr";
};
