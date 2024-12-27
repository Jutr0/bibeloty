import './Sidebar.scss'
import CategoryIcon from '@mui/icons-material/Category';
import {NavLink} from "react-router-dom";
import classnames from "classnames";
import InventoryIcon from "@mui/icons-material/Inventory";
import {Logout, Warehouse, Segment} from "@mui/icons-material";
import axios from "axios";
import {useNavigate} from "react-router";

const Sidebar = () => {
    const navigate = useNavigate();

    const logout = () => {
        axios.request({url: "admin/sign_out", method: "DELETE"})
            .then(() => {
                navigate("/admin")
                localStorage.removeItem("token")
            })
    }

    return <nav className="sidebar">
        <NavLink to='#' className="item logout" onClick={logout}>
            <Logout/> Logout
        </NavLink>
        <NavLink to='/admin/categories' className={({isActive}) => classnames("item", {active: isActive})}>
            <CategoryIcon/> Categories
        </NavLink>
        <NavLink to='/admin/materials' className={({isActive}) => classnames("item", {active: isActive})}>
            <Warehouse/> Materials
        </NavLink>
        <NavLink to='/admin/sections' className={({isActive}) => classnames("item", {active: isActive})}>
            <Segment/> Sections
        </NavLink>
        <NavLink to='/admin/products' className={({isActive}) => classnames("item", {active: isActive})}>
            <InventoryIcon/> Products
        </NavLink>
    </nav>
}

export default Sidebar