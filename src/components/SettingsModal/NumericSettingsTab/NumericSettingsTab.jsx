import { useAdvancedMode, useSettings } from '@store';
import { InputNumber } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingRow } from '../SettingRow';

function NumericSettingsTab() {
    const { t } = useTranslation();
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
    const setRecommendedPasswordLength = useSettings(
        (state) => state.setRecommendedPasswordLength
    );

    const settings = useMemo(
        () => [
            {
                key: 0,
                label: t('Минимальная длина пароля') + ':',
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
                label: t('Максимальная длина пароля') + ':',
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
                label: t('Рекомендуемая длина пароля') + ':',
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
                label: t('Количество паролей') + ':',
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
                label: t('Количество сохраняемых паролей') + ':',
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

    return (
        <div>
            {settings.map((setting, index) => {
                const { label, component } = setting;
                return (
                    <SettingRow key={index} label={label}>
                        {component}
                    </SettingRow>
                );
            })}
        </div>
    );
}

export default NumericSettingsTab;
