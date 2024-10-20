import './Sidebar.scss'
import CategoryIcon from '@mui/icons-material/Category';
import {NavLink} from "react-router-dom";
import classnames from "classnames";
import InventoryIcon from "@mui/icons-material/Inventory";
import {Logout, Warehouse} from "@mui/icons-material";
import axios from "axios";

const Sidebar = () => {

    const logout = () => {
        axios.request({url: "/users/sign_out", method: "DELETE"})
            .then(() => localStorage.removeItem("token"))
    }

    return <nav className="sidebar">
        <NavLink to='/admin' className="item logout" onClick={logout}>
            <Logout/> Logout
        </NavLink>
        <NavLink to='/admin/categories' className={({isActive}) => classnames("item", {active: isActive})}>
            <CategoryIcon/> Categories
        </NavLink>
        <NavLink to='/admin/materials' className={({isActive}) => classnames("item", {active: isActive})}>
            <Warehouse/> Materials
        </NavLink>
        <NavLink to='/admin/products' className={({isActive}) => classnames("item", {active: isActive})}>
            <InventoryIcon/> Products
        </NavLink>
    </nav>
}

export default Sidebar