import React, { useContext } from "react";
import Product from "../components/Product";
import { ProductContext } from "../contexts/ProductContext";
import Hero from "../components/Hero";
const Home = () => {
  const { products } = useContext(ProductContext);
  const filteredProd = products.filter((product) => {
    return (
      product.category === "men's clothing" ||
      product.category === "women's clothing"
    );
  });
  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div
            id="products"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px]"
          >
            {filteredProd.map((item) => {
              return <Product product={item} key={item.id} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
