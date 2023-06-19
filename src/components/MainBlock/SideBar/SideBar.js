import "./SideBar.css";
import {Navigation} from "./Navigation/Navigation";
import {User} from "./User/User";
import {LogOut} from "./LogOut/LogOut";

export const SideBar = ({setLoggedIn, setUserPhoto, setUserName}) => {
    return (
        <aside className="sidebar">
            <section className="section-top">
                <User avatar={setUserPhoto} name={setUserName}/>
                <Navigation/>
            </section>
            <section className="section-bottom">
                <LogOut setLoggedIn={setLoggedIn}/>
            </section>
        </aside>
    )
}