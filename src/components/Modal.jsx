import React, { useRef } from "react";
import { useSpring, animated } from "react-spring";

export const Modal = ({ children, showModal, setShowModal }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  const modalAnimations = useSpring({
    opacity: showModal ? 1 : 0,
    top: showModal ? "50%" : "0%",
  });
  return (
    showModal && (
      <div className="modal" ref={modalRef} onClick={closeModal}>
        <animated.div style={modalAnimations} className="container">
          {children}
        </animated.div>
      </div>
    )
  );
};
