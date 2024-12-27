import { useSettings } from '@store/store';
import { Switch } from 'antd';
import cls from './Setting.module.scss';
import { usePassword } from '@store/store';
import { useState } from 'react';

function Setting(proprs) {
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
            <div className={cls.Title}>{title}</div>
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
