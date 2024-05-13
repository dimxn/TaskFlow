import { CgCloseO } from "react-icons/cg";
import { BsPaletteFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { AiFillBell } from "react-icons/ai";
import React from "react";

import {
  DatePicker,
  LocalizationProvider,
  MobileTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/uk";

export const TodoForm = ({
  handleSubmit,
  heading = false,
  text,
  setText,
  newDay,
  setNewDay,
  newtime,
  setNewTime,
  projects,
  showButtons = false,
  setShowModal = false,
  todoProjects,
  setTodoProjects,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="text">
          {heading && <h3>{heading}</h3>}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Заголовок завдання"
            autoFocus
          />
        </div>
        <div className="remind">
          <AiFillBell size={20} />
          <p>Нагадай мені</p>
        </div>
        <div className="pick-day">
          <div className="title">
            <AiOutlineCalendar />
            <p>Виберіть день</p>
          </div>
          <DatePicker value={newDay} onChange={(day) => setNewDay(day)} />
        </div>
        <div className="pick-time">
          <div className="title">
            <BiTimeFive />
            <p>Виберіть час</p>
          </div>
          <MobileTimePicker
            ampm={false}
            value={newtime}
            onChange={(time) => setNewTime(time)}
          />
        </div>
        <div className="pick-project">
          <div className="title">
            <BsPaletteFill />
            <p>Виберіть категорію</p>
          </div>
          <div className="projects">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  className={`project ${
                    todoProjects === project.name ? "active" : ""
                  }`}
                  key={project.id}
                  onClick={() => setTodoProjects(project.name)}
                >
                  {project.name}
                </div>
              ))
            ) : (
              <div style={{ color: "red" }}>
                Додайте зпершу категорію щоб потім додати завдання!
              </div>
            )}
          </div>
          {showButtons && (
            <div>
              <div className="cancel" onClick={() => setShowModal(false)}>
                <CgCloseO size="30" />
              </div>
              <div className="confirm">
                <button onClick={() => setShowModal(true)}>
                  + Додати новий запис
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </LocalizationProvider>
  );
};
