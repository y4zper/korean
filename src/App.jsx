import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CartSidebar from "./pages/CartSidebar";
import ScrollToTop from "./components/ScrollTop";


export default function App() {
  return (  
    <>
    <ScrollToTop />
    <NavBar />
    <Outlet />
    <Footer />
    <CartSidebar />
    </>
  )
}