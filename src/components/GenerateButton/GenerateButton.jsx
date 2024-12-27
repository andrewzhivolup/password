import { usePassword, useCrigneMode } from '@store/store';
import { Button } from 'antd';
import { useEffect } from 'react';
import { playWisp } from '@utils/playWisp';

import cls from './GenerateButton.module.scss';

function GenerateButton() {
    const generatePassword = usePassword((state) => state.generatePassword);

    const cringeMode = useCrigneMode((state) => state.cringeMode);

    useEffect(() => {
        generatePassword();
    }, []);

    function onClick() {
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
                onClick={onClick}
            >
                Сгенерировать
            </Button>
        </div>
    );
}

export default GenerateButton;
