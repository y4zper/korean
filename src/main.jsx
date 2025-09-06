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
        path: "/TipoPiel",
        element: <TipoPiel/>
      },
      {
        path: "/FAQ",
        element: <FAQ/>
      },
      {
        path: "/checkout",   // 👈 nueva ruta
        element: <Checkout/>
      }
    ],
    basename: "/korean"  // 👈 aquí se define el basename
  },
]);

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
)