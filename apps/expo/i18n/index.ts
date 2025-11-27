import { type LanguageCode, languages } from './languages';

export const fallbackLanguage: LanguageCode = 'en';

export function resolveLanguage(code?: string): LanguageCode {
  if (!code) return fallbackLanguage;
  return Object.hasOwn(languages, code)
    ? (code as LanguageCode)
    : fallbackLanguage;
}

export { languages, type LanguageCode };
