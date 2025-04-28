import { useFileDownloader } from '@hooks/useFileDownloader';
import { useCrigneMode, usePassword } from '@store';
import { playWisp } from '@utils/playWisp';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';

const getButtonText = (passwords) => {
    return passwords.length > 1 ? 'Скачать всё' : 'Скачать';
};

function DownloadButton() {
    const { t } = useTranslation();

    const cringeMode = useCrigneMode((state) => state.cringeMode);
    const downloadFile = useFileDownloader();
    const passwords = usePassword((state) => state.passwords);

    function clickHandler() {
        if (cringeMode) {
            playWisp();
        }
        downloadFile();
    }

    return (
        <>
            <Button
                className={'custom-button'}
                type="primary"
                onClick={clickHandler}
            >
                {t(getButtonText(passwords))}
            </Button>
        </>
    );
}

export default DownloadButton;
