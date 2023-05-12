import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

import './index.css';
import App from './components/App';
import { unregister as unregisterServiceWorker } from './registerServiceWorker';
import './theme/theme.scss';

import { App as Appv2 } from './v2/components/App';
import { store as storev2 } from './v2/redux/store';

let useV1 = false;

const InternalApp = () => {
    if (useV1) {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
    } else {
        return (
            <Provider store={storev2}>
                <BrowserRouter>
                    <Appv2/>
                </BrowserRouter>
            </Provider>
        );
    }
}

ReactDOM.render(
    <InternalApp/>, 
document.getElementById('root'));
unregisterServiceWorker();
