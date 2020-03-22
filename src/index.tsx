import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Montserrat:700','Lato:400,700']
    }
});

ReactDOM.render(<App />, document.getElementById('root'));
