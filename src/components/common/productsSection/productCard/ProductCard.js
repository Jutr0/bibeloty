import './ProductCard.scss';
import {AddShoppingCart} from "@mui/icons-material";
import {useNavigate} from "react-router";
import Button from "../../button/Button";
import {useDispatch} from "react-redux";
import {addProduct} from "../../../../redux/reducers/cartSlice";

const ProductCard = ({product}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const navigateToProduct = () => {
        navigate(`/products/${product.id}`)
    }

    const handleAddToCart = e => {
        e.stopPropagation();
        dispatch(addProduct(product))
    }


    return <div className="product-card" onClick={navigateToProduct}>
        <div className="image"
             style={{backgroundImage: `url(${product.main_image?.url || "/images/placeholder.webp"})`}}></div>
        <div className="info">
            <div className="description">
                <span className="name">{product.name}</span>
                <span className="price">{product.price} PLN</span>
            </div>
            <Button icon onClick={handleAddToCart}><AddShoppingCart/></Button>
        </div>
    </div>
}

export default ProductCard;