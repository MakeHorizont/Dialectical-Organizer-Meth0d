
import { ru } from './ru';
import { en } from './en';
import { es } from './es';
import { zh } from './zh';
import { hi } from './hi';
import { TranslationData, LanguageCode } from '../types';

export const languages: Record<LanguageCode, TranslationData> = {
  ru,
  en,
  es,
  zh,
  hi
};

export const languageNames: Record<LanguageCode, string> = {
  ru: "Русский",
  en: "English",
  es: "Español",
  zh: "中文",
  hi: "हिन्दी"
};
