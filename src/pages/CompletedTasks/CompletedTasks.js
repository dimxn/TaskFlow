import "../../components/MainBlock/MainBlock.css";
import {SideBar} from "../../components/MainBlock/SideBar/SideBar";
import {Tasks} from "../../components/MainBlock/Tasks/Tasks";

export const CompletedTasks = ({setLoggedIn, setUserPhoto, setUserName, setUserId}) => {
    return (
        <>
            <SideBar setLoggedIn={setLoggedIn} setUserName={setUserName} setUserPhoto={setUserPhoto}/>
            <main className="main-block">
                <Tasks titlePage="Виконанні завдання" showCompleted={true} userId={setUserId}/>
            </main>
        </>
    );
};
