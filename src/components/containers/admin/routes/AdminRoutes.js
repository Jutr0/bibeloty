import {Route, Routes, useNavigate} from "react-router";
import React, {useEffect} from "react";
import AdminLayout from ".././layout/AdminLayout";
import Sidebar from "../../../common/sidebar/Sidebar";
import Categories from "../categories/Categories";
import Materials from "../materials/Materials";
import Products from "../products/Products";
import Product from "../products/Product";
import Login from "../login/Login";
import Sections from "../sections/Sections";


const AdminRoutes = () => {
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
                    <Route key="sections" path="sections" element={<Sections/>}/>
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

export default AdminRoutes;