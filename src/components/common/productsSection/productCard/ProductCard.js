import './ProductCard.scss';

const ProductCard = ({product}) => {
    return <div className="product-card">
        <div className="image" style={{backgroundImage: `url(${product.main_image.url})`}}></div>
        <span className="name">{product.name}</span>
        <div className="materials">{product.materials.map(m => m.name).join(", ")}</div>
    </div>
}

export default ProductCard;