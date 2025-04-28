import { useCrigneMode, usePassword, useSettings } from '@store';
import { playWisp } from '@utils/playWisp';
import { Button } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function GenerateButton() {
    const { t } = useTranslation();
    const generatePassword = usePassword((state) => state.generatePassword);
    const passwordCount = useSettings((state) => state.passwordCount);

    const passwordLength = useSettings((state) => state.passwordLength);
    const cringeMode = useCrigneMode((state) => state.cringeMode);

    useEffect(() => {
        generatePassword();
    }, [passwordLength, passwordCount]);

    function clickHandler() {
        if (cringeMode) {
            playWisp();
        }
        generatePassword();
    }

    return (
        <>
            <Button
                className={'custom-button'}
                type="primary"
                onClick={clickHandler}
            >
                {t('Сгенерировать')}
            </Button>
        </>
    );
}

export default GenerateButton;
