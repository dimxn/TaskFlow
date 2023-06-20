import {SideBar} from "./SideBar/SideBar";
import {Tasks} from "./Tasks/Tasks";
import "../MainBlock/MainBlock.css";

export const MainBlock = ({setLoggedIn, setUserName, setUserPhoto, setUserId}) => {
    return (
        <>
            <SideBar setLoggedIn={setLoggedIn} setUserName={setUserName} setUserPhoto={setUserPhoto}/>
            <main className="main-block">
               <Tasks titlePage="Завдання" userId={setUserId} emptyTitle="У Вас немає завдань"
                      emptyText="Щоб створити завдання, натисніть на кнопку - Створити завдання"/>
            </main>
        </>
    )
}