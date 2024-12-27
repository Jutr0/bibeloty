import './ProductCard.scss';
import {AddShoppingCart} from "@mui/icons-material";
import {useNavigate} from "react-router";

const ProductCard = ({product}) => {

    const navigate = useNavigate();

    const navigateToProduct = () => {
        navigate(`/products/${product.id}`)
    }


    return <div className="product-card" onClick={navigateToProduct}>
        <div className="image"
             style={{backgroundImage: `url(${product.main_image?.url || "/images/placeholder.webp"})`}}></div>
        <div className="info">
            <div className="description">
                <span className="name">{product.name}</span>
                <span className="price">{product.price} PLN</span>
            </div>
            <AddShoppingCart/>
        </div>
    </div>
}

export default ProductCard;