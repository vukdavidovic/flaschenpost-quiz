import React from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Quiz} from "./components/Quiz";

function App() {
    return (
        <div id={'app'} className={'full-height'}>
            <Header/>
            <Quiz/>
            <Footer/>
        </div>
    );
}

export default App;
