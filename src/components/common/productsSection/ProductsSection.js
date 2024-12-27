import ProductCard from "./productCard/ProductCard";
import './ProductsSection.scss';

const ProductsSection = ({products = [], title}) => {
    return <div className="products-section" id={title}>
        <div className="title">
            {title}
        </div>
        <div className="products">
            {products.map(product => <ProductCard product={product}/>)}
        </div>
    </div>
}

export default ProductsSection;