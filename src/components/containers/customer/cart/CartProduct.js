import './CartProduct.scss';
import QuantitySelector from "../../../common/quantitySelector/QuantitySelector";
import Button from "../../../common/button/Button";

const CartProduct = ({product}) => {

    return <div className="cart-product">

        <div className="image"
             style={{backgroundImage: `url(${product.main_image?.url || "/images/placeholder.webp"})`}}/>
            <div className="properties">
                <div className="name">{product.name}</div>
                {product.selectedSize && <div className="size">Rozmiar {product.selectedSize}</div>}
                <QuantitySelector value={product.quantity} setValue={()=>null}/>
            </div>
        <div className="price">

        </div>
        <Button>DO PODSUMOWANIA</Button>

    </div>
}

export default CartProduct;