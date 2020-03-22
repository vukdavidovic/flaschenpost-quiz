import React from 'react';
import './Header.scss';

const Header = () => {
    return(
        <header className={'app-header'}>
            <div className="container">
                <div className="app-header-inner space-between">
                    <span className={'logo'}>Flaschenpost test quiz</span>
                </div>
            </div>
        </header>
    );
};

export default Header;
