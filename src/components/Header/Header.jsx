import cls from './Header.module.scss';

const Header = () => {
    //eslint-disable-next-line
    const version = __APP_VERSION__;

    return (
        <div className={cls.Header}>
            <h1 className={cls.title}>password generator</h1>
            <h2 className={cls.version}>v{version}</h2>
        </div>
    );
};

export default Header;
