import { usePassword, useSettings } from '@store';
import { Switch } from 'antd';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './Setting.module.scss';

function Setting(proprs) {
    const { title, name, charset } = proprs;

    const { t } = useTranslation();
    const getSetting = useSettings((state) => state.getSetting);
    const setSetting = useSettings((state) => state.setSetting);
    const onlyOneStateTrue = useSettings((state) => state.onlyOneStateTrue);
    const checkOnlyOneStateTrue = useSettings(
        (state) => state.checkOnlyOneStateTrue
    );
    const generatePassword = usePassword((state) => state.generatePassword);

    const setting = getSetting(name);

    const state = setting?.state ?? true;
    if (!setting) {
        setSetting(name, { state, charset, title });
    }

    const [isChecked, setIsChecked] = useState(state);

    function changeHandler(value) {
        setIsChecked(value);
        setSetting(name, { state: value, charset, title });
        checkOnlyOneStateTrue();
        generatePassword();
    }

    const isDisabled = useMemo(() => {
        if (onlyOneStateTrue) {
            return isChecked;
        }
        return false;
    }, [onlyOneStateTrue, isChecked]);

    return (
        <div className={cls.Setting}>
            <div className={cls.Title}>{t(title)}</div>
            <Switch
                disabled={isDisabled}
                defaultChecked={state}
                onChange={changeHandler}
            />
        </div>
    );
}

export default Setting;
