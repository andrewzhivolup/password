import cls from './SettingRow.module.scss';

function SettingRow(props) {
    const { label, children } = props;

    return (
        <div className={cls.settingRow}>
            <div>{label}</div>
            {children}
        </div>
    );
}

export default SettingRow;
