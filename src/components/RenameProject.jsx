import React, { useContext, useState } from "react";
import { ProjectForm } from "./ProjectForm";
import { auth, collection, firestore } from "../firebase";
import {
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { TodoContext } from "../context";

export const RenameProject = ({ project, setShowModal }) => {
  const [newProjectName, setNewProjectName] = useState(project.name);
  const { selectedProject, setSelectedProject } = useContext(TodoContext);
  const renameProject = async (project, newProjectName) => {
    const user = auth.currentUser;
    if (user) {
      const projectsColRef = collection(
        firestore,
        "users",
        user.uid,
        "projects"
      );

      const existingProjectQuery = query(
        projectsColRef,
        where("name", "==", newProjectName)
      );
      const existingProjectSnapshot = await getDocs(existingProjectQuery);

      if (!existingProjectSnapshot.empty) {
        alert("Категорія з таким же самим імʼям вже існує!");
        return;
      }
      const projectRef = doc(projectsColRef, project.id);
      await updateDoc(projectRef, { name: newProjectName });
      const todosColRef = collection(firestore, "users", user.uid, "tasks");
      const todosQuery = query(
        todosColRef,
        where("project", "==", project.name)
      );
      const todosSnapshot = await getDocs(todosQuery);

      const batch = writeBatch(firestore);
      todosSnapshot.forEach((doc) => {
        batch.update(doc.ref, { project: newProjectName });
      });
      if (selectedProject === project.name) {
        setSelectedProject(newProjectName);
      }
      await batch.commit();
    } else {
      console.log("No user logged in!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    renameProject(project, newProjectName);
    setShowModal(false);
  };
  return (
    <div className="rename-project">
      <ProjectForm
        handleSubmit={handleSubmit}
        heading="Редагувати категорію"
        value={newProjectName}
        setValue={setNewProjectName}
        setShowModal={setShowModal}
        confirmButtonText="Підтвердити"
      />
    </div>
  );
};
