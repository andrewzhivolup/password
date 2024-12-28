import { useTranslation } from 'react-i18next';
import cls from './Header.module.scss';

const Header = () => {
    //eslint-disable-next-line
    const version = __APP_VERSION__;

    const { t } = useTranslation();
    return (
        <div className={cls.Header}>
            <h1 className={cls.title}>{t('генератор паролей')}</h1>
            <h2 className={cls.version}>
                {t('версия')}: {version}
            </h2>
        </div>
    );
};

export default Header;
