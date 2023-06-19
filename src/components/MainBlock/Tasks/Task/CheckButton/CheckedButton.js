import "../CheckButton/Checked.css";

export const CheckedButton = ({click}) => {
    return (
        <button onClick={click} className="checked">
            <i className="fa-solid fa-check"></i>
            Виконано
        </button>
    )
};
export const CheckButton = ({click}) => {
    return (
        <button onClick={click} className="check">
            Виконати
        </button>
    )
};