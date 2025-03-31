import { useColor } from '@store';
import { useTranslation } from 'react-i18next';
import cls from './Header.module.scss';

const Header = () => {
    //eslint-disable-next-line
    const version = __APP_VERSION__;

    const { t } = useTranslation();

    const primaryColor = useColor((state) => state.primaryColor);

    function clearSetting() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className={cls.Header}>
            <h1 className={cls.title} style={{ color: primaryColor }}>
                {t('генератор паролей')}
            </h1>
            <h2 className={cls.version}>
                {t('версия')}: <span onClick={clearSetting}>{version}</span>
            </h2>
        </div>
    );
};

export default Header;
