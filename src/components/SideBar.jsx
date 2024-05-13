import React, { useContext, useEffect, useRef } from "react";
import { TodoContext } from "../context";

export const SideBar = ({ children }) => {
  const { setSelectedTodo } = useContext(TodoContext);
  const sidebarRef = useRef();
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  });

  const handleClick = (e) => {
    if (
      e.target === sidebarRef.current ||
      sidebarRef.current.contains(e.target)
    ) {
      setSelectedTodo(undefined);
    }
  };
  return (
    <div className="sidebar" ref={sidebarRef}>
      {children}
    </div>
  );
};
