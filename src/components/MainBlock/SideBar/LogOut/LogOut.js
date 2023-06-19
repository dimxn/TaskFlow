import "../LogOut/LogOut.css"

export const LogOut = ({setLoggedIn}) => {
    const logOut = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("nickName");
        localStorage.removeItem("userId");
        localStorage.removeItem("image");
        localStorage.removeItem("listTasks");
        setLoggedIn(false)
        window.location.reload();
    }
    return (
        <button onClick={logOut} className="log-out">
            <i className="fa-solid fa-right-from-bracket"></i>
            Вихід
        </button>
    )
}