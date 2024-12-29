import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import App from './App';
import './index.scss';
import {BrowserRouter} from 'react-router-dom'
import axios from "axios";
import {appConfig} from "./config/applicationConfiguration";
import {PersistGate} from "redux-persist/integration/react";

const container = document.getElementById('root');
const root = createRoot(container);

axios.defaults.baseURL = appConfig.apiUrl

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

