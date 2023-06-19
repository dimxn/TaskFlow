import './App.css';
import {LoginPage} from "./pages/LoginPage/LoginPage";
import {MainBlock} from "./components/MainBlock/MainBlock";
import {Navigate, Route, Routes} from 'react-router-dom';
import React, {useState} from "react";
import {CompletedTasks} from "./pages/CompletedTasks/CompletedTasks";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [userName, setUserName] = useState(localStorage.getItem("nickName"));
    const [userPhoto, setUserPhoto] = useState(localStorage.getItem("image"));
    const [userId, setUserId] = useState(localStorage.getItem("userId"));

    return (
        <div className="App">
            <Routes>
                <Route
                    exact
                    path="/tasks"
                    element={
                        isLoggedIn ? (
                            <MainBlock
                                setLoggedIn={setLoggedIn}
                                setUserName={userName}
                                setUserPhoto={userPhoto}
                                setUserId={userId}
                            />
                        ) : (
                            <Navigate to="/login" replace/>
                        )
                    }
                />
                <Route exact path="/" element={<Navigate to="/tasks"/>}/>
                <Route
                    exact
                    path="/completed-tasks"
                    element={
                        isLoggedIn ? (
                            <CompletedTasks
                                setLoggedIn={setLoggedIn}
                                setUserName={userName}
                                setUserPhoto={userPhoto}
                                setUserId={userId}
                            />
                        ) : (
                            <Navigate to="/login" replace/>
                        )
                    }
                />
                <Route
                    exact
                    path="/login"
                    element={
                        isLoggedIn ? (
                            <Navigate to="/tasks" replace/>
                        ) : (
                            <LoginPage
                                setLoggedIn={setLoggedIn}
                                setUserName={setUserName}
                                setUserPhoto={setUserPhoto}
                                setUserId={setUserId}
                            />
                        )
                    }
                />
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
