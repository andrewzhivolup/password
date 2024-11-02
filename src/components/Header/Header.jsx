import React from 'react';
import './Header.scss';

const Header = () => {
    const version = process.env.REACT_APP_VERSION;

    return (
        <div className="header">
            <h1 className="h1">password generator</h1>
            <h2 className="h2">v{version}</h2>
        </div>
    );
};

export default Header;
