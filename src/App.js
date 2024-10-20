import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router";
import Categories from "./components/containers/admin/categories/Categories";
import AdminLayout from "./components/common/./adminLayout/AdminLayout";
import Products from "./components/containers/admin/products/Products";
import Product from "./components/containers/admin/products/Product";
import Materials from "./components/containers/admin/materials/Materials";
import Login from "./components/containers/admin/login/Login";
import Sidebar from "./components/common/sidebar/Sidebar";
import axios from "axios";

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
    const navigate = useNavigate();
    const authorized = localStorage.getItem("token");

    useEffect(() => {
        if (!authorized && window.location.pathname.startsWith('/admin/')) {
            navigate('/admin');
        }
    }, [authorized, navigate]);

    return authorized ?
        <AdminLayout>
            <Sidebar/>
            <Routes>
                <Route path="/admin">
                    <Route key="categories" path="categories" element={<Categories/>}/>
                    <Route key="materials" path="materials" element={<Materials/>}/>
                    <Route key="products" path="products" element={<Products/>}/>
                    <Route key="product" path="products/:id" element={<Product/>}/>
                </Route>
            </Routes>
        </AdminLayout>

        :
        <Routes>
            <Route path="/admin">
                <Route key="login" index element={<Login/>}/>
            </Route>
        </Routes>


}

export default App;
