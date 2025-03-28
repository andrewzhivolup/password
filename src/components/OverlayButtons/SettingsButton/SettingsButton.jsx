import { SettingOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import { useState } from 'react';
import { SettingsModal } from './SettingsModal';

function SettingsButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
            <SettingsModal
                isModalOpen={isModalOpen}
                handleCancel={handleCancel}
            />
        </>
    );
}

export default SettingsButton;
