import "../Task/Task.css";
import taskImage from "../../../../assets/no-img.png";
import {CheckButton, CheckedButton} from "./CheckButton/CheckedButton";
import {useState} from "react";

export const Task = ({
                        title,
                        description,
                        done = false,
                        image = taskImage,
                        check,
                        deleteTask,
                        selectTask,
                        showTask,
                        delay
                    }
    ) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const startDelete = () => {
        setIsDeleting(true);
        setTimeout(() => deleteTask(), 500);
    }

    const customFilling = done ? (<CheckedButton click={check}/>) : (<CheckButton click={check}/>);
    const finalDescription = (
        <p>
            {description.length > 100 ? (
                <>
                    {description.slice(0, 101)}...
                    <br/>
                    <button className="details" onClick={showTask}>Детальніше</button>
                </>
            ) : description}
        </p>
    )
    return (
        <div style={{animation: `${isDeleting ? "fadeOut" : "fadeIn"} 0.${delay}s ease-in-out forwards`}} className="task">
            <div className="task__image">
                <img src={image} alt={image}/>
                <div className="actions__wrapper">
                        <button onClick={selectTask} className="edit">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onClick={() => startDelete()} className="delete">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
            </div>
            <div className="task__wrapper">
                <div className="actions">
                    <h2 className="task__title">
                        {title}
                    </h2>
                    
                </div>
                {finalDescription}
                {customFilling}
            </div>
        </div>
    )
}