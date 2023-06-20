import "./Empty.css";
import EMPTY_IMAGE from "../../../../assets/empty-tasks.png";

export const Empty = ({title, text, image = EMPTY_IMAGE}) => {
    return (
        <>
            <div className="empty">
                <div className="empty-img">
                    <img src={image} alt="empty"/>
                </div>
                <div className="empty-title">
                    <h1>{title}</h1>
                </div>
                <div className="empty-text">
                    <p>{text}</p>
                </div>
            </div>
        </>
    )
}