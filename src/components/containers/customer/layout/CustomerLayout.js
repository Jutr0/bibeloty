import './CustomerLayout.scss'
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

const CustomerLayout = ({children}) => {
    return <main className="customer-layout">
        <Navbar/>
        {children}
        <Footer/>
    </main>
}

export default CustomerLayout;