import i18n from '../i18n';

export function initializeLanguage() {
    const state = localStorage.getItem('language');
    const parse = JSON.parse(state);
    const language = parse?.state?.language || 'ru';
    i18n.changeLanguage(language);
}
