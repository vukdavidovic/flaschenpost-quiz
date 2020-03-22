import React from 'react';
import './Footer.scss';

const Footer = () => {
    return(
        <footer className={'app-footer'}>
            <div className="container-fluid">
                <div className={'copyright text-center'}>
                    &copy; Flaschenpost Quiz
                </div>
            </div>
        </footer>
    );
};

export default Footer;
