import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { products } = useContext(ProductContext);
  const thisProd = products.find((i) => {
    return i.id === parseInt(id);
  });
  if (!thisProd) {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }
  const { image, description, title, price } = thisProd;
  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        <div className=" flex flex-col lg:flex-row items-center">
          <div className=" flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-sm" src={image} alt="" />
          </div>
          <div className=" flex-1 text-center lg:text-left"></div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
