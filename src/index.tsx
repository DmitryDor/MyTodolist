import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './app/App';
import {store} from './app/store';
import {Provider} from 'react-redux';
import AppExample from "./trash/AppExample";

// для   подтягивания изменений в этих файлах

const importApp = <AppExample/>
const importAppWithRedux = <App/>

ReactDOM.render(
    <Provider store={store}>
        <App/>
        {/*<AppExample/>*/}
        {/*<App/>*/}
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
