import './Navbar.scss';
import {useEffect, useState} from "react";
import {buildActions} from "../../../../../utils/actionsBuilder";
import {ShoppingCart} from "@mui/icons-material";

const Navbar = () => {
    const [sections, setSections] = useState([]);
    const actions = buildActions("section")

    useEffect(() => {
        actions.getAll(setSections)
    }, [])

    return <nav className="navbar">
        <img className="logo" src="/images/logo.png"/>
        <div className="links">
            {sections.map(section =>
                <a
                    href={`/#${section.name}`}
                    className="item"
                >
                    {section.name}
                </a>
            )}
            <ShoppingCart htmlColor="#fff"/>
        </div>
    </nav>;
}

export default Navbar;