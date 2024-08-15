import React from 'react';
import {Route, Routes} from "react-router";
import Categories from "./components/containers/categories/Categories";
import Layout from "./components/common/layout/Layout";
import Products from "./components/containers/products/Products";
import Product from "./components/containers/products/Product";
import Materials from "./components/containers/materials/Materials";

function App() {
    return (
        <Layout>
            <Routes>
                <Route key="categories" path="/categories" element={<Categories/>}/>
                <Route key="materials" path="/materials" element={<Materials/>}/>
                <Route key="products" path="/products" element={<Products/>}/>
                <Route key="product" path="/products/:id" element={<Product/>}/>
            </Routes>
        </Layout>

    );
}

export default App;
