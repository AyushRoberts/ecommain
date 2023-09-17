import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { BsBag } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";
import { useState } from "react";
import { useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmt } = useContext(CartContext);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    });
  });
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  return (
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
      } fixed w-full z-10 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to="/">
          <div>
            <img className="w-[40px]" src={Logo} alt="" />
          </div>
        </Link>
        Hello {user && user.name}
        {user && (
          <>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer flex relative"
            >
              <BsBag className="text-2xl" />
              <div className="bg-red-500 absolute right-8 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {itemAmt}
              </div>
            </div>
          </>
        )}
        <CiLogout className="text-2xl ml-3" onClick={logout} />
      </div>
    </header>
  );
};

export default Header;
