import "../User/User.css";
import Avatar from "../../../../assets/avatar.png";

export const User = ({avatar = Avatar, name}) => {
    return (
        <section className="sidebar-top">
            <div className="user">
                <div className="avatar">
                    <img src={avatar} alt="avatar"/>
                    <h3>{name}</h3>
                </div>
            </div>
        </section>
    )
}