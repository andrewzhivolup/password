import { useLanguage } from '@store';
import { FloatButton } from 'antd';
import { useTranslation } from 'react-i18next';

function LocalesButton() {
    const { t, i18n } = useTranslation();

    const language = useLanguage((state) => state.language);
    const setLanguage = useLanguage((state) => state.setLanguage);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
        setLanguage(language);
    };

    const locales = {
        en: 'АНГ',
        ru: 'РУС',
        zh: 'КИТ',
        ja: 'ЯПО',
    };

    return (
        <FloatButton.Group
            trigger="click"
            type="primary"
            shape="square"
            icon=""
            style={{ insetInlineEnd: 24 }}
            description={t(locales[language])}
        >
            {Object.entries(locales).map(([key, localesKey]) => {
                return (
                    <FloatButton
                        key={key}
                        onClick={() => changeLanguage(key)}
                        description={t(localesKey)}
                    />
                );
            })}
        </FloatButton.Group>
    );
}

export default LocalesButton;
