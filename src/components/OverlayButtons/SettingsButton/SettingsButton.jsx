import { SettingOutlined } from '@ant-design/icons';
import { SettingsModal } from '@components/SettingsModal';
import { useModal } from '@store';
import { FloatButton } from 'antd';

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
