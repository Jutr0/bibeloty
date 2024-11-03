import {NavLink} from "react-router-dom";
import classnames from "classnames";
import './Navbar.scss';
import {useNavigate} from "react-router";

const links = [
    {path: "/jewelry", label: "Biżuteria"},
    {path: "/collections", label: "Kolekcje"},
    {path: "/bestsellers", label: "Bestsellery"}
]

const Navbar = () => {

    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    }

    return <nav className="navbar">
        <h1 className="logo" onClick={navigateToHome}>BIBELOTY</h1>
        <div className="links">
            {links.map((link) =>
                <NavLink
                    to={link.path}
                    className={({isActive}) => classnames("item", {active: isActive})}
                >
                    {link.label}
                </NavLink>
            )}
        </div>
    </nav>;
}

export default Navbar;