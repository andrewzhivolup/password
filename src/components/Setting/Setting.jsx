import { usePassword, useSettings } from '@store';
import { Switch } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Setting.module.scss';

function Setting(proprs) {
    const { t } = useTranslation();
    const { title, name, charset } = proprs;

    const getSetting = useSettings((state) => state.getSetting);
    const setSetting = useSettings((state) => state.setSetting);
    const onlyOneStateTrue = useSettings((state) => state.onlyOneStateTrue);
    const checkOnlyOneStateTrue = useSettings(
        (state) => state.checkOnlyOneStateTrue
    );
    const generatePassword = usePassword((state) => state.generatePassword);

    const [isChecked, setIsChecked] = useState(true);

    return (
        <div className={cls.Setting}>
            <div className={cls.Title}>{t(title)}</div>
            <Switch
                disabled={(() => {
                    if (!isChecked) {
                        return false;
                    }
                    return onlyOneStateTrue;
                })()}
                defaultChecked={() => {
                    const setting = getSetting(name);

                    if (!setting) {
                        setSetting(name, { state: true, charset, title });
                        return true;
                    }

                    const { state } = setting;
                    return state;
                }}
                onChange={(value) => {
                    setIsChecked(value);
                    setSetting(name, { state: value, charset, title });
                    checkOnlyOneStateTrue();
                    generatePassword();
                }}
            />
        </div>
    );
}

export default Setting;
