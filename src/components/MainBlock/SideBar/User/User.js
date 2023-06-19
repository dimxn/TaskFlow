import "../User/User.css";

export const User = ({avatar, name}) => {
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