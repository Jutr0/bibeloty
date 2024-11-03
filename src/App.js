import React from 'react';

import axios from "axios";
import AdminRoutes from "./components/containers/admin/routes/AdminRoutes";
import CustomerRoutes from "./components/containers/customer/routes/CustomerRoutes";

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

    return adminView ? <AdminRoutes/> : <CustomerRoutes/>

}

export default App;
