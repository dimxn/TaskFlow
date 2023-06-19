import {NavLink} from "react-router-dom";
import "../Navigation/Navigation.css";

export const Navigation = () => {
    return (
        <section className="nav">
            <nav>
                <NavLink className="nav__links" activeclassname="active" to="/tasks">
                    <i className="fa-solid fa-house"></i>
                    Головна
                </NavLink>
                <NavLink className="nav__links" activeclassname="active" to="/completed-tasks">
                    <i className="fa-solid fa-check-to-slot"></i>
                    Виконані завдання
                </NavLink>

            </nav>
        </section>
    );
};
