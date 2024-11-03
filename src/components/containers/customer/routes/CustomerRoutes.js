import {Route, Routes} from "react-router";
import React from "react";
import CustomerLayout from "../layout/CustomerLayout";
import Home from "../home/Home";


const CustomerRoutes = () => {
    return <CustomerLayout>
        <Routes>
            <Route key="/" index path="/" element={<Home/>}/>
        </Routes>
    </CustomerLayout>


}

export default CustomerRoutes;