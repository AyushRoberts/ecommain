import React from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
import { CartContext } from "../contexts/CartContext";
import { useContext } from "react";
const CartItem = ({ item }) => {
  const { inc, dec, removeFromCart } = useContext(CartContext);
  const { id, image, category, title, price, amount } = item;
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt="" />
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link
              to={`/product/${id}`}
              className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
            >
              {title}
            </Link>
            <div
              onClick={() => removeFromCart(id)}
              className="text-xl cursor-pointer"
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className=" text-sm flex gap-x-2 h-[36px]">
            <div className="flex flex-1 max-w-[100px]  items-center h-full border text-primary font-medium">
              <div
                onClick={() => dec(id)}
                className="flex-1 h-full justify-center items-center flex cursor-pointer"
              >
                <IoMdRemove />
              </div>
              <div className="h-full justify-center flex items-center px-2">
                {amount}
              </div>
              <div
                onClick={() => inc(id)}
                className="flex-1 h-full justify-center items-center flex cursor-pointer"
              >
                <IoMdAdd />
              </div>
            </div>
            <div className="justify-around flex flex-1 items-center">
              $ {price}
            </div>
            <div className="text-primary flex flex-1 justify-end items-center font-medium">{`$ ${parseFloat(
              price * amount
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
