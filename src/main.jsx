import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./index.css";
import Home from "./pages/Home.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import { CartProvider } from "./context/CartContext.jsx";



import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from "./pages/Shop.jsx";
import TipoPiel from "./pages/TipoPiel.jsx";
import FAQ from "./pages/FAQ.jsx";
import Checkout from "./pages/Checkout.jsx";
import NosotrosSection from "./pages/NosotrosSection.jsx";
import Brands from "./pages/Brands.jsx";
import Contacto from "./pages/Contacto.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct/>,
      },
      {
        path: "/shop",  
        element: <Shop/>
      },
      {
        path: "/marca",  
        element: <Brands/>
      },
      {
        path: "/TipoPiel",
        element: <TipoPiel/>
      },
      {
        path: "/FAQ",
        element: <FAQ/>
      },
      { 
        path: "/contacto",
        element: <Contacto/>
      },
      {
        path: "/checkout",   // 👈 nueva ruta
        element: <Checkout/>
      },
      {
        path: "/nosotros",
        element: <NosotrosSection/>
      },
    ]
  },
],
  // {
  //   basename: "/korean",
  // }
);

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
)