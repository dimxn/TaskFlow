import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Todo } from "./Todo";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/uk";
dayjs.locale("uk");
dayjs.extend(customParseFormat);

export const Next7Days = ({ todos }) => {
  const [weekTodos, setWeekTodos] = useState([]);

  useEffect(() => {
    const today = dayjs();
    const days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));
    const sortedTodosByDay = days.map((day) => {
      const dayIndex = day.format("d"); // This will give us day number from 0 (Sunday) to 6 (Saturday)
      return {
        todos: todos.filter((todo) => todo.day === dayIndex),
        date: day,
      };
    });
    setWeekTodos(sortedTodosByDay);
  }, [todos]);

  return (
    <div className="next-seven-days">
      {weekTodos.map((day) => (
        <div key={day.date.format("DD.MM.YYYY")}>
          <div className="day">
            <div className="name">
              {day.date.format("dddd")}
              {day.date.format("d") === dayjs().format("d") && " (Сьогодні)"}
            </div>
            <div className="total-todos">({day.todos.length})</div>
          </div>
          <div className="todos">
            {day.todos.map((todo) => (
              <Todo key={todo.id} todos={todo} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
