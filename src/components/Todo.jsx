import { AiOutlineDelete } from "react-icons/ai";
import { BsArrowClockwise } from "react-icons/bs";
import { FiCircle } from "react-icons/fi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import React, { useContext, useState } from "react";
import { auth, firestore } from "../firebase";
import { doc, writeBatch } from "firebase/firestore";
import dayjs from "dayjs";
import { TodoContext } from "../context";

export const Todo = ({ todos }) => {
  const [hover, setHover] = useState(false);

  const { selectedTodo, setSelectedTodo } = useContext(TodoContext);

  const handleDelete = (todo) => {
    deleteTodo(todo);
    if (selectedTodo === todo) {
      setSelectedTodo(undefined);
    }
  };

  const deleteTodo = async (todo) => {
    const user = auth.currentUser;
    if (user) {
      const taskRef = doc(firestore, "users", user.uid, "tasks", todo.id);
      const batch = writeBatch(firestore);
      batch.delete(taskRef);

      await batch.commit();
    }
  };

  const checkTodo = async (todo) => {
    const user = auth.currentUser;
    if (user) {
      const taskRef = doc(firestore, "users", user.uid, "tasks", todo.id);
      const batch = writeBatch(firestore);
      batch.update(taskRef, {
        checked: !todo.checked,
      });

      await batch.commit();
    }
  };

  const repeatNextDay = async (todo) => {
    const nextDateDay = dayjs(todo.date, "DD.MM.YYYY").add(1, "day");
    const repeatedTodo = {
      ...todo,
      checked: false,
      date: nextDateDay.format("DD.MM.YYYY"),
      day: nextDateDay.format("d"),
    };
    delete repeatedTodo.id;
    const user = auth.currentUser;
    if (user) {
      const taskRef = doc(firestore, "users", user.uid, "tasks", todo.id);
      const batch = writeBatch(firestore);
      batch.set(taskRef, repeatedTodo);

      await batch.commit();
    }
  };

  return (
    <div className="todo">
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo" onClick={() => checkTodo(todos)}>
          {todos.checked ? (
            <span className="checked">
              <BsFillCheckCircleFill color="#bebebe" />
            </span>
          ) : (
            <span className="unchecked">
              <FiCircle color={todos.color} />
            </span>
          )}
        </div>
        <div className="text" onClick={() => setSelectedTodo(todos)}>
          <p style={{ color: todos.checked ? "#bebebe" : "#000" }}>
            {todos.text}
          </p>
          <span>
            {todos.time} - {todos.project}
          </span>
          <div className={`line ${todos.checked ? "line-through" : ""}`}></div>
        </div>
        <div className="add-to-next-day" onClick={() => repeatNextDay(todos)}>
          {todos.checked && (
            <span>
              <BsArrowClockwise />
            </span>
          )}
        </div>
        <div className="delete-todo" onClick={() => handleDelete(todos)}>
          {(hover || todos.checked) && (
            <span>
              <AiOutlineDelete />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
