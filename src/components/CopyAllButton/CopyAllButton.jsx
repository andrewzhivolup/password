import { useCrigneMode, usePassword } from '@store';
import { playWisp } from '@utils/playWisp';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
};

const getButtonStyle = (passwords) => {
    return { display: passwords.length > 1 ? 'block' : 'none' };
};

function CopyAllButton() {
    const { t } = useTranslation();
    const passwords = usePassword((state) => state.passwords);

    const cringeMode = useCrigneMode((state) => state.cringeMode);

    function clickHandler() {
        if (cringeMode) {
            playWisp();
        }
        copyToClipboard(passwords.join('\n'));
    }

    return (
        <>
            <Button
                className={'custom-button'}
                type="primary"
                onClick={clickHandler}
                style={getButtonStyle(passwords)}
            >
                {t('Скопировать всё')}
            </Button>
        </>
    );
}

export default CopyAllButton;
