import React, {useState} from 'react';
import {CheckButton, CheckedButton} from "../Task/CheckButton/CheckedButton";
import "../Task/Task.css";
import "../ShowTask/ShowTask.css";

function ShowTask({setShowTask, selectedTask, check}) {
    const [taskTitle] = useState(selectedTask?.title);
    const [taskDescription] = useState(selectedTask?.description);
    const [taskImage] = useState(selectedTask?.image);
    const customFilling = selectedTask.done ? (<CheckedButton click={check}/>) : (<CheckButton click={check}/>);
    const [isClose, setIsClose] = useState(false);
    const closeTask = () => {
        setIsClose(true);
        setTimeout(() => setShowTask(false), 800);
    }
    return (
        <div className="popup">
            <div style={{animation: `${isClose ? "bounceOut" : "bounceIn"} 0.8s ease-in-out forwards`}} className="show__task">
                <div className="task__image">
                    <img src={taskImage} alt={taskImage}/>
                </div>
                <div className="task__wrapper">
                    <div className="actions">
                        <h2 className="task__title">
                            {taskTitle}
                        </h2>
                        <button className="hide-btn" onClick={() => closeTask()}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                    </div>
                    <p>{taskDescription}</p>
                    {customFilling}
                </div>
            </div>
            <div onClick={() => closeTask()} className="overlay"></div>

        </div>
    );
}

export default ShowTask;