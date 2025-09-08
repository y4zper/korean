import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CartSidebar from "./pages/CartSidebar";
import ChatBot from "./components/Chatbot";


export default function App() {
  return (  
    <>
    <NavBar />
    <Outlet />
    <Footer />
    <CartSidebar />
    <ChatBot />
    </>
  )
}