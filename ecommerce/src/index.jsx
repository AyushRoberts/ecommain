import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import ProductProvider from "./contexts/ProductContext";
import SidebarProvider from "./contexts/SidebarContext";
import CartProvider from "./contexts/CartContext";
import UserContextProvider from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <CartProvider>
        <SidebarProvider>
          <ProductProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </ProductProvider>
        </SidebarProvider>
      </CartProvider>
    </UserContextProvider>
  </BrowserRouter>
);
