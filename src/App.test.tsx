import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

describe('App Test', () => {

    it('renders without crashing', () => {
        const wrapper = shallow(
            <App/>
        );
    });

});
