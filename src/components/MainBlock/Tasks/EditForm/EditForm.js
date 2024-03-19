import "../TasksHeader/AddForm/AddForm.css";
import {useState} from "react";
import {TASKS_URL} from "../../../../utils/constants";

export const EditForm = ({setShowEditForm, selectedTask, setListTasks, listTasks, userId}) => {
    const [taskTitle, setTaskTitle] = useState(selectedTask?.title);
    const [taskDescription, setTaskDescription] = useState(selectedTask?.description);
    const [taskImage, setTaskImage] = useState(selectedTask?.image);

    const [isClose, setIsClose] = useState(false);
    const closeTask = () => {
        setIsClose(true);
        setTimeout(() => setShowEditForm(false), 800);
    }

    const handleTaskImageChange = (e) => {
        setTaskImage(e.target.value)
    }

    const handleTaskTitleChange = (e) => {
        setTaskTitle(e.target.value);
    }

    const handleTaskDescChange = (e) => {
        setTaskDescription(e.target.value);
    }

    const editTask = (e) => {
        e.preventDefault();
        const updatedTask = {
            ...selectedTask,
            title: taskTitle,
            description: taskDescription,
            image: taskImage
        }

        fetch(TASKS_URL(userId) + selectedTask.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        })
            .then(resp => resp.json())
            .then(updatedTaskFromServer => {
                const updatedTasks = listTasks.map((task) => {
                    if (task.id === updatedTaskFromServer.id) return updatedTaskFromServer;
                    return task;
                })
                setListTasks(updatedTasks);
                closeTask();
            })
            .catch(err => console.log(err))
    }
    return (

        <div className="popup">
            <form onSubmit={editTask} style={{animation: `${isClose ? "bounceOut" : "bounceIn"} 0.8s ease-in-out forwards`}} className="add-form">
                <button className="hide-btn" onClick={() => closeTask()}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
                <h2>Редагування завдання</h2>
                <div>
                    <input type="text" className="add-form__input" value={taskTitle} onChange={handleTaskTitleChange}
                           placeholder="Заголовок завдання" required/>
                </div>
                <div>
                    <input type="text" className="add-form__input" value={taskImage} onChange={handleTaskImageChange}
                           placeholder="Вставте власне зображення (не обов.)"/>
                </div>
                <div>
                    <textarea rows="8" className="add-form__input" value={taskDescription}
                              onChange={handleTaskDescChange} placeholder="Опис завдання" required></textarea>
                </div>
                <div>
                    <button type="submit" className="check">Зберегти та закрити</button>
                </div>
            </form>
            <div onClick={() => closeTask()} className="overlay"></div>
        </div>
    )
}