import { usePassword, useSettings } from '@store';
import { Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import cls from './Password.module.scss';

function Password() {
    const { Paragraph } = Typography;

    const { t } = useTranslation();

    const passwords = usePassword((state) => state.passwords);
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
        <>
            {passwords.map((password, key) => {
                return (
                    <Paragraph
                        key={key}
                        className={cls.Password}
                        style={{
                            color: getPasswordColor(passwordLength),
                            margin: '10px',
                        }}
                        copyable={{
                            tooltips: [t('Копировать'), t('Скопировано')],
                        }}
                    >
                        {password}
                    </Paragraph>
                );
            })}
        </>
    );
}

export default Password;
