import { usePassword } from '@store';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const useFilenameGenerator = () => {
    const { t } = useTranslation();

    const generateFilename = useCallback(() => {
        const date = new Date().toISOString().slice(0, 19);
        const filename = `${t('Пароли')}_${date}.txt`;
        return filename;
    }, [t]);

    return generateFilename;
};

export const useFileDownloader = () => {
    const generateFilename = useFilenameGenerator();
    const passwords = usePassword((state) => state.passwords);

    const download = () => {
        const filename = generateFilename();
        const element = document.createElement('a');
        element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' +
                encodeURIComponent(passwords.join('\n'))
        );
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return download;
};
