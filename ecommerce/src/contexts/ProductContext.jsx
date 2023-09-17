import { createContext, useState, useEffect } from "react";
import React from "react";

export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProd = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProd();
  }, []);
  return (
    <div>
      <ProductContext.Provider value={{ products }}>
        {children}
      </ProductContext.Provider>
    </div>
  );
};

export default ProductProvider;
