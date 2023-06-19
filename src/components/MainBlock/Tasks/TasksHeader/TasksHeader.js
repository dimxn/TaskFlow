import {SearchForm} from "./SearchForm/SearchForm";
import {useState} from "react";
import {AddForm} from "./AddForm/AddForm";

export const TasksHeader = ({titlePage, setListTasks, listTasks, setFilteredTasks, setSearchQuery, setUserId}) => {
    const [showAddForm, setShowAddForm] = useState(false);
    return (
        <header className="tasks-header">
            <h1 className="tasks__title">
                {titlePage}
            </h1>
            <button onClick={() => setShowAddForm(true)} className="tasks__add">
                Створити завдання
            </button>
            <SearchForm setFilteredTasks={setFilteredTasks} setSearchQuery={setSearchQuery}/>
            {showAddForm && <AddForm setListTasks={setListTasks} listTasks={listTasks} setShowAddForm={setShowAddForm}
                                     setUserId={setUserId}/>}
        </header>
    )
}