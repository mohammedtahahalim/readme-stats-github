import { TLang } from "../langs/allowedLangs";

export const convertNumber = (num: number | string, lang: TLang): string => {
  const NATIVE_LANGS_FORMATTERS: Record<TLang, Intl.NumberFormat> = {
    en: new Intl.NumberFormat("en"),
    zh: new Intl.NumberFormat("zh-u-nu-hanidec"),
    hi: new Intl.NumberFormat("hi-u-nu-deva"),
    es: new Intl.NumberFormat("es"),
    ar: new Intl.NumberFormat("ar-u-nu-arab"),
    fr: new Intl.NumberFormat("fr"),
    bn: new Intl.NumberFormat("bn-u-nu-beng"),
    pt: new Intl.NumberFormat("pt"),
    ru: new Intl.NumberFormat("ru"),
    ur: new Intl.NumberFormat("ur-u-nu-arabext"),
    ja: new Intl.NumberFormat("ja-u-nu-hanidec"),
  };

  return NATIVE_LANGS_FORMATTERS[lang].format(Number(num));
};
