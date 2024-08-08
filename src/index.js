import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import App from './App';
import './index.scss';
import {BrowserRouter} from 'react-router-dom'
import axios from "axios";
import {appConfig} from "./config/applicationConfiguration";

const container = document.getElementById('root');
const root = createRoot(container);

axios.defaults.baseURL = appConfig.apiUrl

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

