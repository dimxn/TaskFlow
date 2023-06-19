import "../Task/Task.css";
import taskImage from "../../../../assets/no-img.png";
import {CheckButton, CheckedButton} from "./CheckButton/CheckedButton";

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
                     }) => {

    const customFilling = done ? (<CheckedButton click={check}/>) : (<CheckButton click={check}/>);
    const finalDescription = (
        <p>
            {description.length > 100 ? (
                <>
                    {description.slice(0, 101)}...
                    <button className="details" onClick={showTask}>Детальніше</button>
                </>
            ) : description}
        </p>
    )
    return (
        <div style={{animationDelay: `0.${delay}s`}} className="task">
            <div className="task__image">
                <img src={image} alt="image"/>
            </div>
            <div className="task__wrapper">
                <div className="actions">
                    <h2 className="task__title">
                        {title}
                    </h2>
                    <div className="actions__wrapper">
                        <button onClick={selectTask} className="edit">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button onClick={deleteTask} className="delete">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
                {finalDescription}
                {customFilling}
            </div>
        </div>
    )
}