import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import English from '@locales/en/translation.json';
import Russian from '@locales/ru/translation.json';
import Chinese from '@locales/zh/translation.json';
import Japanese from '@locales/ja/translation.json';

const resources = {
    en: {
        translation: English,
    },
    ru: {
        translation: Russian,
    },
    zh: {
        translation: Chinese,
    },
    ja: {
        translation: Japanese,
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: 'ru',
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
