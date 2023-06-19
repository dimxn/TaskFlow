import React, {useState} from 'react';
import {CheckButton, CheckedButton} from "../Task/CheckButton/CheckedButton";
import "../Task/Task.css";
import "../ShowTask/ShowTask.css";

function ShowTask({setShowTask, selectedTask, check}) {
    const [taskTitle] = useState(selectedTask?.title);
    const [taskDescription] = useState(selectedTask?.description);
    const [taskImage] = useState(selectedTask?.image);
    const customFilling = selectedTask.done ? (<CheckedButton click={check}/>) : (<CheckButton click={check}/>);

    return (
        <>
            <div className="show__task">
                <div className="task__image">
                    <img src={taskImage} alt="image"/>
                </div>
                <div className="task__wrapper">
                    <div className="actions">
                        <h2 className="task__title">
                            {taskTitle}
                        </h2>
                        <button className="hide-btn" onClick={() => setShowTask(false)}>
                            <i className="fa-solid fa-circle-xmark"></i>
                        </button>
                    </div>
                    <p>{taskDescription}</p>
                    {customFilling}
                </div>
            </div>
            <div onClick={() => setShowTask(false)} className="overlay"></div>

        </>
    );
}

export default ShowTask;