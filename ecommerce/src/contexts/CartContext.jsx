import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmt, setItemAmt] = useState(0);
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmt(amount);
    }
  }, [cart]);
  useEffect(() => {
    const total = cart?.reduce(
      (accumulator, curr) => accumulator + curr.price * curr.amount,
      0
    );
    setTotal(total);
  }, [cart]);
  const [total, setTotal] = useState(0);
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((i) => {
      return i.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((c) => {
        if (c.id === id) return { ...c, amount: cartItem.amount + 1 };
        else return c;
      });
      setCart(newCart);
    } else setCart([...cart, newItem]);
  };
  const removeFromCart = (id) => {
    const newCart = cart.filter((i) => {
      return i.id !== id;
    });
    setCart(newCart);
  };
  const clearCart = () => {
    setCart([]);
  };
  const inc = (id) => {
    const item = cart.find((u) => {
      return u.id === id;
    });
    addToCart(item, id);
  };
  const dec = (id) => {
    const item = cart.find((u) => {
      return u.id === id;
    });
    if (item) {
      const newCart = cart.map((i) => {
        if (i.id === id) return { ...i, amount: item.amount - 1 };
        else return i;
      });
      setCart(newCart);
    }
    if (item.amount < 2) removeFromCart(id);
  };
  return (
    <CartContext.Provider
      value={{
        setCart,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        inc,
        dec,
        itemAmt,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
