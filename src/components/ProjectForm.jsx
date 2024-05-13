import React from "react";

export const ProjectForm = ({
  handleSubmit,
  heading,
  value,
  setValue,
  setShowModal,
  confirmButtonText,
}) => {
  return (
    <form onSubmit={handleSubmit} className="project-form">
      <h3>{heading}</h3>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Категорія..."
        autoFocus
      />
      <button className="cancel" onClick={() => setShowModal(false)}>
        Відміна
      </button>
      <button className="confirm">{confirmButtonText}</button>
    </form>
  );
};
