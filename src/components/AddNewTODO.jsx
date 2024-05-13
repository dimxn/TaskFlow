import React, { useContext, useEffect, useState } from "react";
import { Modal } from "./Modal";
import dayjs from "dayjs";
import { TodoForm } from "./TodoForm";
import { calendarItems } from "../constants";
import { TodoContext } from "../context";
import { auth, collection, doc, firestore } from "../firebase";
import { writeBatch } from "firebase/firestore";
import randomColor from "randomcolor";

export const AddNewTODO = () => {
  const { projects, selectedProject } = useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [newDay, setNewDay] = useState(dayjs());
  const [newtime, setNewTime] = useState(dayjs());
  const [todoProject, setTodoProject] = useState(selectedProject);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text && !calendarItems.includes(todoProject)) {
      auth.onAuthStateChanged(async (user) => {
        const userRef = doc(firestore, "users", user.uid);

        const batch = writeBatch(firestore);
        const taskRef = doc(collection(userRef, "tasks"));
        batch.set(taskRef, {
          text: text,
          date: dayjs(newDay).format("DD.MM.YYYY"),
          day: dayjs(newDay).format("d"),
          project: todoProject,
          color: randomColor(),
          checked: false,
          time: dayjs(newtime).format("HH:mm"),
        });
        await batch.commit();
      });
      setShowModal(false);
      setText("");
      setNewDay(dayjs());
      setNewTime(dayjs());
    }
  };

  useEffect(() => {
    setTodoProject(selectedProject);
  }, [selectedProject]);

  return (
    <div className="add-new-todo">
      <div className="btn">
        <button onClick={() => setShowModal(true)}>+ Новий запис</button>
      </div>
      <Modal setShowModal={setShowModal} showModal={showModal}>
        <TodoForm
          handleSubmit={handleSubmit}
          heading="Додати новий запис"
          text={text}
          setText={setText}
          newDay={newDay}
          setNewDay={setNewDay}
          newtime={newtime}
          setNewTime={setNewTime}
          todoProjects={todoProject}
          setTodoProjects={setTodoProject}
          projects={projects}
          showButtons={true}
          setShowModal={setShowModal}
        />
      </Modal>
    </div>
  );
};
