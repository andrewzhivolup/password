import { usePassword } from '@store/store';
import { Button } from 'antd';
import { useEffect } from 'react';

import cls from './GenerateButton.module.scss';

function GenerateButton() {
    const generatePassword = usePassword((state) => state.generatePassword);

    useEffect(() => {
        generatePassword();
    }, []);

    function onClick() {
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
