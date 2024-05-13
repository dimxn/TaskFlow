import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
import { Modal } from "./Modal";
import { auth, firestore } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { ProjectForm } from "./ProjectForm";

export const AddNewProject = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (projectName) {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        const projectsColRef = collection(userRef, "projects");
        const projectsQuery = query(
          projectsColRef,
          where("name", "==", projectName)
        );

        const querySnapshot = await getDocs(projectsQuery);
        if (querySnapshot.empty) {
          const batch = writeBatch(firestore);
          const newProjectRef = doc(projectsColRef);
          batch.set(newProjectRef, {
            name: projectName,
          });
          await batch.commit();
          setShowModal(false);
          setProjectName("");
        } else {
          alert("Дана категорія вже існує!");
        }
      }
    }
  };

  return (
    <div className="add-new-project">
      <div className="add-button">
        <span onClick={() => setShowModal(true)}>
          <AiOutlinePlus size={20} />
        </span>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <ProjectForm
          handleSubmit={handleSubmit}
          heading="Додати нову категорію"
          value={projectName}
          setValue={setProjectName}
          setShowModal={setShowModal}
          confirmButtonText="+ Додати категорію"
        />
      </Modal>
    </div>
  );
};
