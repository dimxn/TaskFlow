import "../AddForm/AddForm.css";
import {useState} from "react";
import {TASKS_URL} from "../../../../../utils/constants";

export const AddForm = ({setShowAddForm, setListTasks, listTasks, setUserId}) => {

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskImage, setTaskImage] = useState('');

    const handleTaskImageChange = (e) => {
        setTaskImage(e.target.value)
    }
    const handleTaskTitleChange = (e) => {
        setTaskTitle(e.target.value);
    }

    const handleTaskDescChange = (e) => {
        setTaskDescription(e.target.value);
    }

    const createTask = (e) => {
        e.preventDefault();
        const newTask = {
            title: taskTitle,
            description: taskDescription,
            done: false,
        }

        if (taskImage) {
            newTask.image = taskImage;
        }

        fetch(TASKS_URL(setUserId), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        })
            .then(resp => resp.json())
            .then(newTaskFromServer => {
                setListTasks([...listTasks, newTaskFromServer]);
                setShowAddForm(false);
            })
            .catch(err => console.log(err));


    }
    return (
        <>
            <form onSubmit={createTask} className="add-form">
                <button className="hide-btn" onClick={() => setShowAddForm(false)}>
                    <i className="fa-solid fa-circle-xmark"></i>
                </button>
                <h2>Створення завдання</h2>
                <div>
                    <input type="text" className="add-form__input" value={taskTitle} onChange={handleTaskTitleChange}
                           placeholder="Заголовок завдання" required/>
                </div>
                <div>
                    <input type="text" className="add-form__input" value={taskImage} onChange={handleTaskImageChange}
                           placeholder="Вставте зображення (не обов.)"/>
                </div>
                <div>
                    <textarea rows="8" className="add-form__input" value={taskDescription}
                              onChange={handleTaskDescChange} placeholder="Опис завдання" required></textarea>
                </div>
                <div>
                    <button type="submit" className="check">Додати завдання</button>
                </div>
            </form>
            <div onClick={() => setShowAddForm(false)} className="overlay"></div>
        </>
    )
}