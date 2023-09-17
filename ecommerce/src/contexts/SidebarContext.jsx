import React, { useState, createContext } from "react";
export const SidebarContext = createContext();
const SidebarProvider = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
      {props.children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
