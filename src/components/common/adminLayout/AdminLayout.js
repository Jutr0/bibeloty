import './AdminLayout.scss'

const AdminLayout = ({children}) => {
    return <div className="admin-layout">
        <div className="main">
            {children}
        </div>
    </div>
}

export default AdminLayout;