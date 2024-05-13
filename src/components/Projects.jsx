import { BiCaretUpCircle } from "react-icons/bi";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillPaletteFill } from "react-icons/bs";
import React, { useContext, useState } from "react";
import { Project } from "./Project";
import { AddNewProject } from "./AddNewProject";
import { TodoContext } from "../context";

export const Projects = () => {
  const [showMenu] = useState(true);
  const [edit, setEdit] = useState(false);
  const pencilColor = edit ? "#1ec94c" : "#000";

  const { projects } = useContext(TodoContext);

  return (
    <div className="categorys">
      <div className="header">
        <div className="title">
          <BsFillPaletteFill size={18} />
          <p>Категорії</p>
        </div>
        <div className="btns">
          {showMenu && projects.length > 0 && (
            <span className="edit" onClick={() => setEdit((edit) => !edit)}>
              <BsFillPencilFill size={15} color={pencilColor} />
            </span>
          )}
          <AddNewProject />
          <span className="arrow">
            <BiCaretUpCircle size={20} />
          </span>
        </div>
      </div>
      <div
        className="items"
        style={{
          animation: "0.3s ease 0s 1 normal forwards running fadeIn",
        }}
      >
        {projects.map((project) => (
          <Project project={project} key={project.id} edit={edit} />
        ))}
      </div>
    </div>
  );
};
