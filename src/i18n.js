import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import English from '@locales/en/translation.json';
import Russian from '@locales/ru/translation.json';

const resources = {
    en: {
        translation: English,
    },
    ru: {
        translation: Russian,
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