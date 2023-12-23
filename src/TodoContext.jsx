import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
// import { useAddTodo, useGetTodos } from "./featuresHook/useTodo";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  // if (isLoading) return;

  const [darkMode, setDarkMode] = useLocalStorage(
    window.matchMedia("(prefers-color-scheme:dark)").matches,
    "dark-mode"
  );

  const value = useMemo(() => {
    function handleAddTask(task) {
      setTasks((tasks) => [...tasks, task]);
    }

    function handleToggleCompletedTask(item) {
      const updatedArray = tasks.map((task) =>
        task === item ? { ...task, completed: !task.completed } : task
      );
      setTasks(updatedArray);
    }
    function deleteTask(item) {
      const newArray = tasks.filter((task) => !(task.id === item.id));
      setTasks(newArray);
    }
    function showCompletedTask() {
      // setTasks((tasks) => [...tasks.filter((task) => task.completed)]);
      setActiveIndex(2);
    }
    function showActiveTask() {
      setActiveIndex(1);
    }
    function showAll() {
      setActiveIndex(0);
      setTasks(tasks);
    }

    function clearCompleted() {
      setTasks((tasks) => tasks.filter((task) => !task.completed));
    }
    function toggleMode() {
      setDarkMode((mode) => !mode);
    }
    return {
      darkMode,
      tasks,
      setTasks,
      handleAddTask,
      deleteTask,
      activeIndex,
      toggleMode,
      handleToggleCompletedTask,
      showAll,
      showCompletedTask,
      showActiveTask,
      clearCompleted,
    };
  }, [tasks, activeIndex, darkMode, setTasks, setDarkMode]);
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

function useTodo() {
  const todo = useContext(TodoContext);
  if (todo === undefined) {
    throw new Error("Context unavailable here");
  }
  return useContext(TodoContext);
}

export { TodoProvider, useTodo };
