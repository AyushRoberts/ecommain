import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdArrowForward, IoMdRemove } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "./CartItem";
import { SidebarContext } from "../contexts/SidebarContext";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";
const Sidebar = () => {
  const { isOpen, handleClose, setIsOpen } = useContext(SidebarContext);
  const { setCart, cart, clearCart, total } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [orderHistory, setOrderHistory] = useState();
  const [curOldOrder, setCurOldOrder] = useState(0);
  const purchase = async () => {
    await axios
      .post("http://16.171.35.127:3001/newOrder", {
        customer_id: user._id,
        cart,
      })
      .then((response) => {
        alert(response.data.message);
        clearCart();
        getOrderHist();
      });
  };

  const getOrderHist = async () => {
    await axios
      .get("http://16.171.35.127:3001/orderHistory", {
        headers: {
          customer_id: user._id,
        },
      })
      .then((response) => {
        setOrderHistory(response.data);
      });
  };
  const prevOrder = () => {
    setCurOldOrder((curOldOrder) =>
      orderHistory[curOldOrder - 1] ? curOldOrder - 1 : curOldOrder
    );
  };
  const nextOrder = () => {
    setCurOldOrder((curOldOrder) =>
      orderHistory[curOldOrder + 1] ? curOldOrder + 1 : curOldOrder
    );
  };
  const repeatLastOrder = () => {
    setCurOldOrder(orderHistory.length - 1);
    setCart(orderHistory[orderHistory.length - 1]?.items);
  };
  useEffect(() => {
    getOrderHist();
  }, []);
  useEffect(() => {
    setCart(orderHistory ? orderHistory[curOldOrder]?.items : []);
  }, [curOldOrder]);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex justify-between items-center py-6 border-b">
        <div className="uppercase font-semibold text-sm">Bag</div>
        <IoMdRemove className=" cursor-pointer" onClick={prevOrder} />
        <div className="viewlast cursor-pointer" onClick={repeatLastOrder}>
          Repeat Last Order
        </div>
        <IoMdAdd className=" cursor-pointer" onClick={nextOrder} />
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className=" flex flex-col gap-y-2 h-[480px] overflow-y-auto overflow-x-hidden border-b">
        {cart?.map((i) => {
          return <CartItem item={i} key={i.id} />;
        })}
      </div>
      <div className=" flex flex-col gap-y-3 py-4 mt-4">
        <div className=" flex w-full justify-between items-center">
          <div className=" uppercase font-semibold">
            <span className=" mr-2">Total</span>$ {total}
          </div>
          <div
            onClick={clearCart}
            className=" cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <button
          onClick={handleClose}
          className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium"
        >
          CLOSE
        </button>
        <button
          onClick={purchase}
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
