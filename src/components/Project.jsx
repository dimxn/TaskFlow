import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import React, { useContext, useState } from "react";
import { RenameProject } from "./RenameProject";
import {
  doc,
  writeBatch,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { auth, firestore } from "../firebase";
import { TodoContext } from "../context";

export const Project = ({
  project,
  edit,
  activeProject,
  setActiveProject,
  setActive,
}) => {
  const { defaultProject, selectedProject, setSelectedProject } =
    useContext(TodoContext);

  const [showModal, setShowModal] = useState(false);

  const projectDelete = async (project) => {
    const user = auth.currentUser;
    if (user) {
      const projectRef = doc(
        firestore,
        "users",
        user.uid,
        "projects",
        project.id
      );
      const todosRef = collection(firestore, "users", user.uid, "tasks");
      const todosQuery = query(todosRef, where("project", "==", project.name));
      const batch = writeBatch(firestore);
      batch.delete(projectRef);
      const querySnapshot = await getDocs(todosQuery);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      if (selectedProject === project.name) setSelectedProject(defaultProject);
    } else {
      console.log("No user logged in!");
    }
  };

  return (
    <div
      className={`project ${activeProject === project.name ? "active" : ""}`}
      onClick={() => {
        setActiveProject(project.name);
        setSelectedProject(project.name);
        setActive("");
      }}
    >
      <div className="name">{project.name}</div>
      <div className="btns">
        {edit ? (
          <div className="edit-delete">
            <span className="edit" onClick={() => setShowModal(true)}>
              <BsFillPencilFill size={13} />
            </span>
            <span className="delete" onClick={() => projectDelete(project)}>
              <AiFillDelete size={13} />
            </span>
          </div>
        ) : project.numOfTodos === 0 ? (
          ""
        ) : (
          <div className="total-todos">{project.numOfTodos}</div>
        )}
      </div>
      {showModal && (
        <div className="rename-project-modal">
          <RenameProject project={project} setShowModal={setShowModal} />
        </div>
      )}
    </div>
  );
};
