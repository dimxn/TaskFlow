import React from "react";
import NOTASKS from "../assets/images/noTasks.svg";

export const NoTasks = ({ todoTitle }) => {
  return (
    <div
      className="no-tasks"
      style={{
        animation: "0.3s ease 0s 1 normal forwards running fadeIn",
      }}
    >
      <div className="no-tasks__img">
        <img src={NOTASKS} alt="no-tasks" />
      </div>
      <div className="no-tasks__wrapper">
        <h2>У вас немає завдань!</h2>
        <p>
          Для того щоб зʼявилися завдання в пункті "
          <span style={{ textDecoration: "underline" }}>{todoTitle}</span>"
          натисніть на <br /> "+ Новий запис"
        </p>
      </div>
    </div>
  );
};
