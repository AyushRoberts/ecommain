import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [orderHistory, setOrderHistory] = useState();

  const getOrderHistory = async () => {
    await axios
      .get("http://localhost:3000/orderHistory", {
        headers: { customer_id: user._id },
      })
      .then((r) => {
        setOrderHistory(r.data);
      });
  };

  useEffect(() => {
    getOrderHistory();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, orderHistory }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
