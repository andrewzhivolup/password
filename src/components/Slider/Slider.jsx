import { usePassword, useSettings } from '@store/store';
import { Slider } from 'antd';
import { useTranslation } from 'react-i18next';
import cls from './Slider.module.scss';

function _Slider() {
    const { t } = useTranslation();

    const passwordLength = useSettings((state) => state.passwordLength);
    const setPasswordLength = useSettings((state) => state.setPasswordLength);
    const minPasswordLength = useSettings((state) => state.minPasswordLength);
    const maxPasswordLength = useSettings((state) => state.maxPasswordLength);

    const generatePassword = usePassword((state) => state.generatePassword);

    const marks = {
        [minPasswordLength]: {
            label: minPasswordLength,
        },
        [maxPasswordLength]: {
            label: maxPasswordLength,
        },
    };

    return (
        <div className={cls.Slider}>
            <Slider
                defaultValue={passwordLength}
                min={minPasswordLength}
                max={maxPasswordLength}
                marks={marks}
                tooltip={{ open: true }}
                onChange={(value) => {
                    setPasswordLength(value);
                    generatePassword();
                }}
            />
            <p className={cls.SliderHint}>{t('Длина пароля')}</p>
        </div>
    );
}

export default _Slider;