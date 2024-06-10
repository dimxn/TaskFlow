import React, { useContext } from "react";
import { Todo } from "./Todo";
import { Next7Days } from "./Next7Days";
import { TodoContext } from "../context";
import { NoTasks } from "./NoTasks";
import { motion, AnimatePresence } from "framer-motion";

export const Todos = () => {
  const { todos, selectedProject } = useContext(TodoContext);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="todo-s"
        key={selectedProject}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="selected-projects"
          key={selectedProject}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedProject}
        </motion.div>
        {todos.length > 0 ? (
          <motion.div
            className="todos"
            key={todos}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedProject === "Цього тижня" ? (
              <Next7Days todos={todos} />
            ) : (
              todos.map((todo) => <Todo todos={todo} key={todo.id} />)
            )}
          </motion.div>
        ) : (
          <NoTasks todoTitle={selectedProject} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
