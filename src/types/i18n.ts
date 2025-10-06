// src/types/i18n.ts

// CORREÇÃO: Importando do arquivo 'i18n.config.ts' na raiz
import { locales } from '../../i18n.config';

export type Locale = (typeof locales)[number];

export type LocalePageProps = {
  params: {
    locale: Locale;
  };
};

type Messages = typeof import('../../messages/pt.json');
declare interface IntlMessages extends Messages {}