import { usePassword, useSettings } from '@store/store';
import { Typography } from 'antd';
import cls from './Password.module.scss';

function Password() {
    const { Paragraph } = Typography;

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
            copyable={{ tooltips: ['Копировать', 'Скопировано'] }}
        >
            {password}
        </Paragraph>
    );
}

export default Password;
