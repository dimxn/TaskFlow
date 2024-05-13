import React, { useContext, useEffect, useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoContext } from "../context";
import { auth, firestore } from "../firebase";
import { doc, writeBatch } from "firebase/firestore";
import dayjs from "dayjs";

export const EditTodo = () => {
  const [text, setText] = useState("");
  const [newDay, setNewDay] = useState(null);
  const [newTime, setNewTime] = useState(null);
  const [todoProject, setTodoProject] = useState("");

  const { projects, selectedTodo } = useContext(TodoContext);

  useEffect(() => {
    if (selectedTodo) {
      setText(selectedTodo.text);
      setNewDay(dayjs(selectedTodo.date, "DD.MM.YYYY"));
      setNewTime(dayjs(selectedTodo.time, "HH:mm"));
      setTodoProject(selectedTodo.project);
    }
  }, [selectedTodo]);

  useEffect(() => {
    if (selectedTodo) {
      const user = auth.currentUser;
      if (user) {
        const taskRef = doc(
          firestore,
          "users",
          user.uid,
          "tasks",
          selectedTodo.id
        );
        const batch = writeBatch(firestore);
        batch.update(taskRef, {
          text,
          date: dayjs(newDay, "DD.MM.YYYY").format("DD.MM.YYYY"),
          day: dayjs(newDay, "DD.MM.YYYY").format("d"),
          time: dayjs(newTime, "HH:mm").format("HH:mm"),
          project: todoProject,
        });

        batch.commit();
      }
    }
  }, [text, newDay, newTime, todoProject, selectedTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update logic here
  };

  return (
    <div className="">
      {selectedTodo && (
        <div className="edit-todo">
          <div className="header">Відредагувати завдання</div>
          <div className="container">
            <TodoForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              newDay={newDay}
              setNewDay={setNewDay}
              newTime={newTime}
              setNewTime={setNewTime}
              todoProject={todoProject}
              setTodoProjects={setTodoProject}
              projects={projects}
            />
          </div>
        </div>
      )}
    </div>
  );
};
