import './Navbar.scss';
import {useEffect, useState} from "react";
import {buildActions} from "../../../../../utils/actionsBuilder";
import {ShoppingCart} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {NavLink} from "react-router-dom";
import classnames from "classnames";
import {useNavigate} from "react-router";

const Navbar = () => {
    const [sections, setSections] = useState([]);
    const actions = buildActions("section")

    const navigate = useNavigate();

    const navigateToCart = () => {
        navigate("/cart")
    }

    const productsCount = useSelector(state => state.cart.products.reduce((sum, value) => sum + value.quantity, 0))

    useEffect(() => {
        actions.getAll(setSections)
    }, [])

    return <nav className="navbar">
        <img className="logo" src="/images/logo.png"/>
        <div className="links">
            {sections.map(section =>
                <NavLink
                    key={section.name}
                    to={`/#${section.name}`}
                    className={({isActive}) => classnames("item", {active: isActive})}
                >
                    {section.name}
                </NavLink>
            )}
            <div className='cart-icon' onClick={navigateToCart}>
                <ShoppingCart htmlColor="#fff" />
                {productsCount > 0 && <div className="products-indicator">
                    {productsCount}
                </div>}
            </div>
        </div>
    </nav>;
}

export default Navbar;