import React from "react";
import Man from "../img/man_hero.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className="bg-red-300 h-[800px]bg-hero bg-no-repeat bg-center py-24">
      <div className="container mx-auto flex justify-around h-full">
        <div className="flex flex-col justify-center">
          <div className=" font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] bg-white mr-3"></div>WELCOME TO
          </div>
          <h1 className="text-[70px] leading=[1.1] font-light mb-4">
            shopstop <br />
            <span className=" font-semibold">You are right on time </span>
          </h1>
          <a
            href="#products"
            className="self-start uppercase border-b-2 font-semibold border-white"
          >
            See Why
          </a>
        </div>
        <div className="hidden lg:block">
          <img src={Man} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
