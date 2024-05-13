import React, { useContext } from "react";
import { Todo } from "./Todo";
import { Next7Days } from "./Next7Days";
import { TodoContext } from "../context";
import { NoTasks } from "./NoTasks";

export const Todos = () => {
  const { todos, selectedProject } = useContext(TodoContext);

  return (
    <div className="todo-s">
      <div
        className="selected-projects"
        style={{
          animation: "0.3s ease 0s 1 normal forwards running fadeIn",
        }}
      >
        {selectedProject}
      </div>
      {todos.length > 0 ? (
        <div className="todos">
          {selectedProject === "Цього тижня" ? (
            <Next7Days todos={todos} />
          ) : (
            todos.map((todo) => <Todo todos={todo} key={todo.id} />)
          )}
        </div>
      ) : (
        <NoTasks todoTitle={selectedProject} />
      )}
    </div>
  );
};
