import { useAdvancedMode } from '@store';
import { Switch } from 'antd';

function AdvancedModeSwitch() {
    const advancedMode = useAdvancedMode((state) => state.advancedMode);
    const setAdvancedMode = useAdvancedMode((state) => state.setAdvancedMode);

    return (
        <>
            <Switch checked={advancedMode} onChange={setAdvancedMode} />
        </>
    );
}

export default AdvancedModeSwitch;
