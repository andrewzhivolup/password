import { useResetSettings } from '@hooks/useResetSettings';
import { useAdvancedMode, useModal } from '@store';
import { Modal, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GraphicSettingsTab } from './GraphicSettingsTab';
import { ModalTitle } from './ModalTitle';
import { NumericSettingsTab } from './NumericSettingsTab';

function SettingsModal() {
    const { t } = useTranslation();
    const resetSettings = useResetSettings();

    const [activeKey, setActiveKey] = useState('1');

    const isOpenModal = useModal((state) => state.isOpenModal);
    const setIsOpenModal = useModal((state) => state.setIsOpenModal);

    const advancedMode = useAdvancedMode((state) => state.advancedMode);

    useEffect(() => {
        if (!advancedMode) {
            setActiveKey('4');
            resetSettings();
        } else {
            setActiveKey('1');
        }
    }, [advancedMode]);

    const settingsTabs = [
        {
            key: '1',
            label: t('Числовые значения'),
            children: <NumericSettingsTab />,
            disabled: !advancedMode,
        },
        {
            key: '2',
            label: t('Графика'),
            children: <GraphicSettingsTab />,
            disabled: !advancedMode,
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

    return (
        <Modal
            title={<ModalTitle title={t('Настройки')} />}
            open={isOpenModal}
            onCancel={() => setIsOpenModal(false)}
            footer={[]}
        >
            <Tabs
                activeKey={activeKey}
                items={settingsTabs}
                onChange={setActiveKey}
            />
        </Modal>
    );
}

export default SettingsModal;
