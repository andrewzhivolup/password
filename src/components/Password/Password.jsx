import { usePassword, useSettings } from '@store';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import cls from './Password.module.scss';

function Password() {
    const { Paragraph } = Typography;

    const { t } = useTranslation();

    const password = usePassword((state) => state.password);
    const passwordLength = useSettings((state) => state.passwordLength);
    const recommendedPasswordLength = useSettings(
        (state) => state.recommendedPasswordLength
    );

    const trueColor = '#a1db84';
    const falseColor = '#ff6e6e';

    function getPasswordColor(passwordLength) {
        return passwordLength < recommendedPasswordLength
            ? falseColor
            : trueColor;
    }

    return (
        <Paragraph
            className={cls.Password}
            style={{
                color: getPasswordColor(passwordLength),
            }}
            copyable={{ tooltips: [t('Копировать'), t('Скопировано')] }}
        >
            {password}
        </Paragraph>
    );
}

export default Password;
