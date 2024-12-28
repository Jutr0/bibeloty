import Container from "../layout/box/Container";
import './Cart.scss';
import {useSelector} from "react-redux";
import CartProduct from "./CartProduct";

const Cart = () => {

    const products = useSelector(state => state.cart.products)

    return <Container className="cart">
        <h2 className="header">PRODUKTY W KOSZYKU</h2>
        {products.map(p => <CartProduct key={p.id} product={p} />)}
    </Container>
}

export default Cart;