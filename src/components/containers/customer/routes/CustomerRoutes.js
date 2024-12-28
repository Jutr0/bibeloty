import {Route, Routes} from "react-router";
import React from "react";
import CustomerLayout from "../layout/CustomerLayout";
import Home from "../home/Home";
import ProductView from "../product/ProductView";
import Cart from "../cart/Cart";


const CustomerRoutes = () => {
    return <CustomerLayout>
        <Routes>
            <Route key="/" index path="/" element={<Home/>}/>
            <Route key="product" index path="/products/:id" element={<ProductView />}/>
            <Route key="cart" index path="/cart" element={<Cart />}/>
        </Routes>
    </CustomerLayout>


}

export default CustomerRoutes;