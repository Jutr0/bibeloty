import './Sidebar.scss'
import CategoryIcon from '@mui/icons-material/Category';
import {NavLink} from "react-router-dom";
import classnames from "classnames";

const Sidebar = () => {

    return <nav className="sidebar">
        <NavLink to='/categories' className={({isActive}) => classnames("item", {active: isActive})}>
            <CategoryIcon/> Categories
        </NavLink>
    </nav>
}

export default Sidebar