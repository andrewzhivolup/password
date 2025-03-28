import { useAdvancedMode, useSettings } from '@store';
import { InputNumber, Modal, Switch, Tabs } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
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

function SettingsModal(proprs) {
    const { isModalOpen, handleCancel } = proprs;

    const advancedMode = useAdvancedMode((state) => state.advancedMode);

    const minValue = useSettings((state) => state.minValue);
    const maxValue = useSettings((state) => state.maxValue);

    const minPasswordLength = useSettings((state) => state.minPasswordLength);
    const maxPasswordLength = useSettings((state) => state.maxPasswordLength);
    const recommendedPasswordLength = useSettings(
        (state) => state.recommendedPasswordLength
    );

    const setMinPasswordLength = useSettings(
        (state) => state.setMinPasswordLength
    );
    const setMaxPasswordLength = useSettings(
        (state) => state.setMaxPasswordLength
    );
    const setRecommendedPasswordLength = useSettings(
        (state) => state.setRecommendedPasswordLength
    );

    const settings = useMemo(
        () => [
            {
                key: 0,
                text: 'Минимальная длина пароля:',
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
                text: 'Максимальная длина пароля:',
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
                text: 'Рекомендуемая длина пароля:',
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
                text: 'Количество паролей:',
                component: (
                    <InputNumber
                        min={1}
                        max={100}
                        value={1}
                        // disabled={!advancedMode}
                        disabled
                    />
                ),
            },
            {
                key: 4,
                text: 'Количество сохраняемых паролей:',
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
            minPasswordLength,
            maxPasswordLength,
            recommendedPasswordLength,
            advancedMode,
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
            label: 'Числовые значения',
            children: <NumericSettings />,
            disabled: !advancedMode,
        },
        {
            key: '2',
            label: 'Графика',
            disabled: true,
        },
        {
            key: '3',
            label: 'Экспорт/Импорт',
            disabled: true,
        },
        {
            key: '4',
            disabled: advancedMode,
        },
    ];

    function generateModalTitle() {
        return (
            <>
                Настройки: <SetAdvancedModeSwitch />
            </>
        );
    }

    const [activeKey, setActiveKey] = useState('1');

    useEffect(() => {
        if (!advancedMode) {
            setActiveKey('4');
        }
        if (advancedMode) {
            setActiveKey('1');
        }
    }, [advancedMode]);

    return (
        <>
            <Modal
                title={generateModalTitle()}
                open={isModalOpen}
                onCancel={handleCancel}
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
