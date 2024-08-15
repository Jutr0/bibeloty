import './Layout.scss'
import Sidebar from "../sidebar/Sidebar";

const Layout = ({children}) => {
    return <div className="layout">
        <Sidebar/>
        <div className="main">
            {children}
        </div>
    </div>
}

export default Layout;