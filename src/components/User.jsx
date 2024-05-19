import { IoMdExit } from "react-icons/io";
import React from "react";
import logo from "../assets/images/avatar.png";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const User = ({ user, photo }) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };
  return (
    <div className="user">
      {photo ? (
        <div className="logo">
          <img src={photo} alt="logo" />
        </div>
      ) : (
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
      )}
      <div className="info">
        <p>{user}</p>
        <div className="logout" onClick={handleLogOut}>
          <IoMdExit size={35} />
        </div>
      </div>
    </div>
  );
};
