import {useEffect, useState} from "react";
import {TasksHeader} from "./TasksHeader/TasksHeader";
import "../Tasks/Tasks.css";
import {Task} from "./Task/Task";
import {TASKS_URL} from "../../../utils/constants";
import {EditForm} from "./EditForm/EditForm";
import ShowTask from "./ShowTask/ShowTask";
import {Loading} from "./Loading/Loading";
import {Empty} from "./Empty/Empty";
import TASKS_DONE from "../../../assets/tasks-done.png";

export const Tasks = ({titlePage, showCompleted, userId}) => {
    const [listTasks, setListTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const getTasks = () => {
        fetch(TASKS_URL(userId))
            .then((resp) => {
                if (resp.ok) return resp.json();
                setError(resp.statusText);
            })
            .then((tasksFromServer) => {
                setListTasks(tasksFromServer);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setError(error);
            });
    };

    useEffect(() => {
        setIsLoading(true);
        getTasks();
    }, []);

    const checkTask = (pos) => {
        const updatedTasks = [...listTasks];
        updatedTasks[pos].done = !updatedTasks[pos].done;
        fetch(TASKS_URL(userId) + updatedTasks[pos].id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTasks[pos]),
        })
            .then((res) => res.json())
            .then((updatedTaskFromServer) => {
                updatedTasks[pos] = updatedTaskFromServer;
                setListTasks(updatedTasks);
            })
            .catch((err) => console.log(err));
    };

    const deleteTask = (taskID) => {
        const isDelete = window.confirm("Видалити завдання?");
        if (isDelete) {
            fetch(TASKS_URL(userId) + taskID, {
                method: "DELETE",
            })
                .then(() =>
                    setListTasks(listTasks.filter((task) => task.id !== taskID))
                )
                .catch((err) => console.log(err));
        }
    };

    const [selectedTask, setSelectedTask] = useState({});
    const [showEditForm, setShowEditForm] = useState(false);
    const [showTask, setShowTask] = useState(false);

    const selectTask = (pos) => {
        setSelectedTask(listTasks[pos]);
        setShowEditForm(true);
    };
    const showedTask = (pos) => {
        setSelectedTask(listTasks[pos]);
        setShowTask(true);
    }

    useEffect(() => {
        const filteredTasks = listTasks.filter((task) =>
            task.title && task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredTasks(filteredTasks);
    }, [listTasks, searchQuery]);


    if (isLoading) return <Loading/>;
    if (!Array.isArray(listTasks)) return <Loading isError={true} errorText={"Щось пішло не так"}/>;
    if (error) return <Loading isError={true} errorText={error.message}/>;

    return (
        <section className="tasksWrapper">
            <TasksHeader
                titlePage={titlePage}
                setListTasks={setListTasks}
                listTasks={listTasks}
                setFilteredTasks={setFilteredTasks}
                setSearchQuery={setSearchQuery}
                setUserId={userId}
            />
            <section className="tasksList">
                {filteredTasks.length > 0 ? (
                    <>
                        {showCompleted && filteredTasks.every(task => !task.done) ? (
                            <Empty
                                title="У Вас немає жодного виконаного завдання!"
                            />
                        ) : (
                            filteredTasks.map((task, pos) => showCompleted && !task.done ? null : (
                                <Task
                                    title={task.title}
                                    description={task.description}
                                    image={task.image}
                                    done={task.done}
                                    check={() => checkTask(pos)}
                                    deleteTask={() => deleteTask(task.id)}
                                    key={task.id}
                                    selectTask={() => selectTask(pos)}
                                    showTask={() => showedTask(pos)}
                                    delay={pos + 1}
                                />
                            ))
                        )}
                    </>
                ) : (
                    <Empty
                        title="У Вас немає завдань"
                        text="Щоб створити завдання, натисніть на кнопку - Створити завдання"
                    />
                )}
            </section>
            {showEditForm && (
                <EditForm
                    userId={userId}
                    selectedTask={selectedTask}
                    setShowEditForm={setShowEditForm}
                    setListTasks={setListTasks}
                    listTasks={listTasks}
                />
            )}
            {showTask && (
                <ShowTask
                    setShowTask={setShowTask}
                    selectedTask={selectedTask}
                />
            )}
        </section>
    );
};
