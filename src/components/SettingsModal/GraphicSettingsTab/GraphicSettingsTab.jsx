import { useAdvancedMode, useColor } from '@store';
import { ColorPicker } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingRow } from '../SettingRow';

function NumericSettingsTab() {
    const { t } = useTranslation();
    const advancedMode = useAdvancedMode((state) => state.advancedMode);

    const primaryColor = useColor((state) => state.primaryColor);
    const setPrimaryColor = useColor((state) => state.setPrimaryColor);

    const graphicSettings = useMemo(
        () => [
            {
                key: 0,
                label: t('Основной цвет') + ':',
                component: (
                    <ColorPicker
                        value={primaryColor}
                        onChangeComplete={(value) => {
                            setPrimaryColor('primaryColor', value);
                        }}
                    />
                ),
            },
        ],
        [t, primaryColor, advancedMode]
    );

    return (
        <div>
            {graphicSettings.map((setting, index) => {
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
