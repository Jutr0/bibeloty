import './Sidebar.scss'
import CategoryIcon from '@mui/icons-material/Category';
import {NavLink} from "react-router-dom";
import classnames from "classnames";
import InventoryIcon from "@mui/icons-material/Inventory";

const Sidebar = () => {

    return <nav className="sidebar">
        <NavLink to='/categories' className={({isActive}) => classnames("item", {active: isActive})}>
            <CategoryIcon/> Categories
        </NavLink>
        <NavLink to='/products' className={({isActive}) => classnames("item", {active: isActive})}>
            <InventoryIcon/> Products
        </NavLink>
    </nav>
}

export default Sidebar