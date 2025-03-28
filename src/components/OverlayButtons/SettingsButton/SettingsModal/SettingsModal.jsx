import { useAdvancedMode, useModal, useSettings } from '@store';
import { defaultParameters } from '@utils/defaultParameters';
import { InputNumber, Modal, Switch, Tabs } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './SettingsModal.module.scss';

function SetAdvancedModeSwitch() {
    const advancedMode = useAdvancedMode((state) => state.advancedMode);
    const setAdvancedMode = useAdvancedMode((state) => state.setAdvancedMode);

    return (
        <>
            <Switch defaultChecked={advancedMode} onChange={setAdvancedMode} />
        </>
    );
}

function SettingsModal() {
    const { t } = useTranslation();

    const isOpenModal = useModal((state) => state.isOpenModal);
    const setIsOpenModal = useModal((state) => state.setIsOpenModal);

    const advancedMode = useAdvancedMode((state) => state.advancedMode);

    const minValue = useSettings((state) => state.minValue);
    const maxValue = useSettings((state) => state.maxValue);

    const minPasswordLength = useSettings((state) => state.minPasswordLength);
    const maxPasswordLength = useSettings((state) => state.maxPasswordLength);
    const passwordCount = useSettings((state) => state.passwordCount);
    const recommendedPasswordLength = useSettings(
        (state) => state.recommendedPasswordLength
    );

    const setMinPasswordLength = useSettings(
        (state) => state.setMinPasswordLength
    );
    const setMaxPasswordLength = useSettings(
        (state) => state.setMaxPasswordLength
    );
    const setPasswordCount = useSettings((state) => state.setPasswordCount);
    const setPasswordLength = useSettings((state) => state.setPasswordLength);
    const setRecommendedPasswordLength = useSettings(
        (state) => state.setRecommendedPasswordLength
    );

    const settings = useMemo(
        () => [
            {
                key: 0,
                text: t('Минимальная длина пароля') + ':',
                component: (
                    <InputNumber
                        min={minValue}
                        max={maxPasswordLength - 1}
                        value={minPasswordLength}
                        disabled={!advancedMode}
                        onChange={setMinPasswordLength}
                    />
                ),
            },
            {
                key: 1,
                text: t('Максимальная длина пароля') + ':',
                component: (
                    <InputNumber
                        min={minPasswordLength + 1}
                        max={maxValue}
                        value={maxPasswordLength}
                        disabled={!advancedMode}
                        onChange={setMaxPasswordLength}
                    />
                ),
            },
            {
                key: 2,
                text: t('Рекомендуемая длина пароля') + ':',
                component: (
                    <InputNumber
                        min={minPasswordLength}
                        max={maxPasswordLength}
                        value={recommendedPasswordLength}
                        disabled={!advancedMode}
                        onChange={setRecommendedPasswordLength}
                    />
                ),
            },
            {
                key: 3,
                text: t('Количество паролей') + ':',
                component: (
                    <InputNumber
                        min={minValue}
                        max={maxValue}
                        value={passwordCount}
                        disabled={!advancedMode}
                        onChange={setPasswordCount}
                    />
                ),
            },
            {
                key: 4,
                text: t('Количество сохраняемых паролей') + ':',
                component: (
                    <InputNumber
                        min={0}
                        max={100}
                        value={0}
                        // disabled={!advancedMode}
                        disabled
                    />
                ),
            },
        ],
        [
            t,
            minPasswordLength,
            maxPasswordLength,
            recommendedPasswordLength,
            advancedMode,
            passwordCount,
        ]
    );

    const Setting = useCallback(({ setting }) => {
        const { text, component } = setting;
        return (
            <div className={cls.setting}>
                <div>{text}</div>
                {component}
            </div>
        );
    }, []);

    const NumericSettings = useMemo(
        () => () =>
            (
                <div>
                    {settings.map((setting) => {
                        const { key } = setting;
                        return <Setting key={key} setting={setting} />;
                    })}
                </div>
            ),
        [settings, Setting]
    );

    const settingsTabs = [
        {
            key: '1',
            label: t('Числовые значения'),
            children: <NumericSettings />,
            disabled: !advancedMode,
        },
        {
            key: '2',
            label: t('Графика'),
            disabled: true,
        },
        {
            key: '3',
            label: t('Экспорт/Импорт'),
            disabled: true,
        },
        {
            key: '4',
            disabled: advancedMode,
        },
    ];

    function generateModalTitle() {
        return (
            <div className={cls.title}>
                {t('Настройки')}: <SetAdvancedModeSwitch />
            </div>
        );
    }

    const [activeKey, setActiveKey] = useState('1');

    useEffect(() => {
        if (!advancedMode) {
            setActiveKey('4');

            const {
                passwordLength,
                recommendedPasswordLength,
                minPasswordLength,
                maxPasswordLength,
                passwordCount,
            } = defaultParameters;

            setMinPasswordLength(minPasswordLength);
            setMaxPasswordLength(maxPasswordLength);
            setPasswordLength(passwordLength);
            setRecommendedPasswordLength(recommendedPasswordLength);
            setPasswordCount(passwordCount);
        }
        if (advancedMode) {
            setActiveKey('1');
        }
    }, [advancedMode]);

    return (
        <>
            <Modal
                title={generateModalTitle()}
                open={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                footer={[]}
            >
                <Tabs
                    defaultActiveKey="1"
                    items={settingsTabs}
                    activeKey={activeKey}
                    onChange={(activeKey) => {
                        setActiveKey(activeKey);
                    }}
                />
            </Modal>
        </>
    );
}

export default SettingsModal;
