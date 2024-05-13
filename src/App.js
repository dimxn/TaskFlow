import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { SideBar } from "./components/SideBar";
import { Main } from "./components/Main";
import { User } from "./components/User";
import { AddNewTODO } from "./components/AddNewTODO";
import { Calendar } from "./components/Calendar";
import { Projects } from "./components/Projects";
import { Todos } from "./components/Todos";
import { EditTodo } from "./components/EditTodo";
import Login from "./components/Login";
import { auth } from "./firebase";
import { Loader } from "./components/Loader";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              user ? (
                <>
                  <SideBar>
                    <User
                      user={auth.currentUser.displayName}
                      photo={auth.currentUser.photoURL}
                    />
                    <AddNewTODO />
                    <Calendar />
                    <Projects />
                  </SideBar>
                  <Main>
                    <Todos />
                    <EditTodo />
                  </Main>
                </>
              ) : (
                <Navigate replace to="/login" />
              )
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
