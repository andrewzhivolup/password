import { useCrigneMode, usePassword, useSettings } from '@store/store';
import { playWisp } from '@utils/playWisp';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './GenerateButton.module.scss';

function GenerateButton() {
    const { t } = useTranslation();
    const generatePassword = usePassword((state) => state.generatePassword);
    const passwordLength = useSettings((state) => state.passwordLength);
    const cringeMode = useCrigneMode((state) => state.cringeMode);

    useEffect(() => {
        generatePassword();
    }, [passwordLength]);

    function clickHandler() {
        if (cringeMode) {
            playWisp();
        }
        generatePassword();
    }

    return (
        <div className={cls.ButtonBlock}>
            <Button
                className={cls.GenerateButton}
                type="primary"
                onClick={clickHandler}
            >
                {t('Сгенерировать')}
            </Button>
        </div>
    );
}

export default GenerateButton;
