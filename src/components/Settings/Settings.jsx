import { useSettings } from '@store/store';
import { Setting } from '../Setting';
import cls from './Settings.module.scss';

function Settings() {
    const settings = useSettings((state) => state.settings);

    return (
        <div className={cls.Settings}>
            {Object.entries(settings).map(([name, { title, charset }]) => {
                return (
                    <Setting
                        title={title}
                        name={name}
                        key={name}
                        charset={charset}
                    />
                );
            })}
        </div>
    );
}

export default Settings;
