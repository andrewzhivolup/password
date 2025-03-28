import { SettingOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useState } from 'react';
import { SettingsModal } from './SettingsModal';
import { useModal } from '@store';

function SettingsButton() {
    const setIsOpenModal = useModal((state) => state.setIsOpenModal);

    const showModal = () => {
        setIsOpenModal(true);
    };

    return (
        <>
            <FloatButton.Group
                onClick={showModal}
                trigger="click"
                type="primary"
                shape="square"
                icon={<SettingOutlined />}
                style={{ insetInlineEnd: 'auto', left: 24 }}
            />
            <SettingsModal />
        </>
    );
}

export default SettingsButton;
