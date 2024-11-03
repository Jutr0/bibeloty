import './Home.scss';
import {get} from "../../../../utils/actionsBuilder";
import {useEffect, useState} from "react";
import ProductsSection from "../../../common/productsSection/ProductsSection";

const Home = () => {

    const [products, setProducts] = useState({});

    const actions = {
        getProducts: (callback) => get("/home", callback)
    }

    useEffect(() => {
        actions.getProducts(setProducts);
    }, [])

    return <div className="home">

        <div className="carousel">
            <div className="image" style={{backgroundImage: "url('/images/startPage.webp')"}}/>
        </div>
        <ProductsSection products={products.bestsellers} title="BESTSELLERY"/>

    </div>
}

export default Home;