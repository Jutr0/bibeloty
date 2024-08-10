import React from 'react';
import {Route, Routes} from "react-router";
import Categories from "./components/containers/categories/Categories";
import Layout from "./components/common/layout/Layout";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/categories" element={<Categories/>}/>
            </Routes>
        </Layout>

    );
}

export default App;
