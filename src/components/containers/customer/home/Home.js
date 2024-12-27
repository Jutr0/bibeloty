import './Home.scss';
import {get} from "../../../../utils/actionsBuilder";
import {useEffect, useState} from "react";
import ProductsSection from "../../../common/productsSection/ProductsSection";
import Container from "../layout/box/Container";

const Home = () => {

    const [productsSections, setProductsSections] = useState([]);

    const actions = {
        getProductsSections: (callback) => get("/products", callback)
    }

    useEffect(() => {
        actions.getProductsSections(setProductsSections);
    }, [])

    return <div className="home">
        <div className="carousel">
            <div className="image" style={{backgroundImage: "url('/images/startPage.webp')"}}/>
        </div>
        <Container>

            {productsSections.map(productsSection => <ProductsSection products={productsSection.products}
                                                                      title={productsSection.name}/>)}
        </Container>
    </div>
}

export default Home;