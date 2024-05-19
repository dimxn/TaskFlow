import { BiCaretUpCircle } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import React, { useContext, useState } from "react";
import { calendarItems } from "../constants";
import { TodoContext } from "../context";

export const Calendar = ({ active, setActive, setActiveProject }) => {
  const { setSelectedProject } = useContext(TodoContext);
  return (
    <div className="calendar">
      <div className="header">
        <div className="title">
          <AiOutlineCalendar size={20} />
          <p>Календар</p>
        </div>
        <div className="btns">
          <span>
            <BiCaretUpCircle size={20} />
          </span>
        </div>
      </div>
      <div className="items">
        {calendarItems.map((item) => (
          <div
            className={`item ${active === item ? "active" : ""}`}
            key={item}
            onClick={() => {
              setActive(item);
              setSelectedProject(item);
              setActiveProject("");
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
