import React from 'react';

import axios from "axios";
import AdminRoutes from "./components/containers/admin/routes/AdminRoutes";

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

function App() {
    const adminView = window.location.pathname.startsWith('/admin')

    return adminView ? <AdminRoutes/> : <div>USER ROUTES</div>

}

export default App;
