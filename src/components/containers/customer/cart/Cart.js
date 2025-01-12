import Container from "../layout/./container/Container";
import './Cart.scss';
import {useSelector} from "react-redux";
import Button from "../../../common/button/Button";
import CartProduct from "./CartProduct";
import {useNavigate} from "react-router";

const Cart = () => {

    const products = useSelector(state => state.cart.products)
    const isEmpty = !products || products.length === 0;
    const navigate = useNavigate();
    const navigateToCheckout = () => {
        navigate('/checkout')
    }

    return <Container className="cart">
        <h2 className="header">{isEmpty ? 'KOSZYK JEST PUSTY' : 'PRODUKTY W KOSZYKU'}</h2>
        {!isEmpty && <>
            <Button className="result" onClick={navigateToCheckout}>DO PODSUMOWANIA</Button>
            <div className="products">
                {products.map(p => <CartProduct key={p.id} product={p}/>
                )}
            </div>
        </>}
    </Container>
}

export default Cart;