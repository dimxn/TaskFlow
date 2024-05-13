import { useState, useEffect } from "react";
import { auth, firestore, collection, onSnapshot } from "../firebase";
import dayjs from "dayjs";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    let unsubscribe;

    const listener = auth.onAuthStateChanged((user) => {
      if (user) {
        const tasksRef = collection(firestore, "users", user.uid, "tasks");
        unsubscribe = onSnapshot(tasksRef, (snapshot) => {
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(data);
        });
      } else {
        setTodos([]);
      }
    });

    return () => {
      listener();
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return todos;
}

export function useFilterTodos(todos, selectedProject) {
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const todayDateFormated = dayjs().format("DD.MM.YYYY");

    const data = todos.filter((todo) => {
      if (selectedProject === "Сьогодні") {
        return todo.date === todayDateFormated;
      } else if (selectedProject === "Цього тижня") {
        const todoDate = dayjs(todo.date, "DD.MM.YYYY");
        const todayDate = dayjs(todayDateFormated, "DD.MM.YYYY");
        const diffDays = todoDate.diff(todayDate, "day");
        return diffDays >= 0 && diffDays < 7;
      } else if (selectedProject === "Весь час") {
        return true;
      } else {
        return todo.project === selectedProject;
      }
    });

    setFilteredTodos(data);
  }, [todos, selectedProject]);

  return filteredTodos;
}

export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let unsubscribe;

    const listener = auth.onAuthStateChanged((user) => {
      if (user) {
        const projectsRef = collection(
          firestore,
          "users",
          user.uid,
          "projects"
        );
        unsubscribe = onSnapshot(projectsRef, (snapshot) => {
          const data = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              name: doc.data().name,
            };
          });
          setProjects(data);
        });
      } else {
        setProjects([]);
      }
    });

    return () => {
      listener();
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return projects;
}

export function useProjectsWithStats(projects, todos) {
  const [projectsWithStats, setProjectsWithStats] = useState([]);
  useEffect(() => {
    const data = projects.map((project) => {
      return {
        numOfTodos: todos.filter(
          (todo) => todo.project === project.name && !todo.checked
        ).length,
        ...project,
      };
    });
    setProjectsWithStats(data);
  }, [projects, todos]);
  return projectsWithStats;
}
