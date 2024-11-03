import './CustomerLayout.scss'
import Navbar from "./navbar/Navbar";

const CustomerLayout = ({children}) => {
    return <main className="customer-layout">
        <Navbar />
        <div className="container">
            {children}
        </div>
    </main>
}

export default CustomerLayout;