import 'server-only';
import { Locale } from '../../i18n.config';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
};

export const hasLocale = (locale: string): locale is Locale =>
  locale === 'en' || locale === 'ar';

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};
