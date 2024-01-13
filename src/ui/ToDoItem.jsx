import { useEffect, useState } from "react";
import { useTodo } from "../TodoContext.jsx";
import CircularDiv from "./CircularDiv";
import { useDeleteTodo, useUpdateTodo } from "../featuresHook/useTodo";
import SpinnerMini from "./SpinnerMini.jsx";

function ToDoItem({ task, provided, innerRef, id }) {
  const [activeHover, setActiveHover] = useState(false);

  const { darkMode } = useTodo();
  const { isDeleting, deleteTodo } = useDeleteTodo();
  const { isUpdating, updateTodo } = useUpdateTodo();

  function handleToggleComplete(e) {
    e.preventDefault();
    console.log(e.target);
    updateTodo({ id, completed: !task.completed });
  }
  function handleDeleteTodo(e) {
    e.preventDefault();
    if (e.target.alt === "close-button") return deleteTodo(task.id);
  }
  function handleHover() {
    setActiveHover(true);
  }
  function hanleLeave() {
    setActiveHover(false);
  }

  if (isUpdating) return <SpinnerMini text="Updating task" />;
  if (isDeleting) return <SpinnerMini text="Deleting task" />;

  return (
    <li
      className={`${
        darkMode ? "bg-[#25273c]" : ""
      } flex items-center gap-6 py-6 px-6 cursor-pointer transition-all duration-300`}
      onMouseEnter={handleHover}
      onMouseLeave={hanleLeave}
      ref={innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      id={task.id}
    >
      {!task.completed ? (
        <CircularDiv onClick={handleToggleComplete} />
      ) : (
        // <div className="w-6 h-6 cursor-pointer rounded-full bg-check border-2  flex items-center justify-center transition-allr">
        //   <img src="/icon-check.svg" alt="Checked" />
        // </div>
        <CircularDiv className={"bg-check"} onClick={handleToggleComplete}>
          <img src="/icon-check.svg" alt="Checked" />
        </CircularDiv>
      )}

      {darkMode ? (
        <p
          className={`${
            task.completed ? "line-through  text-[#cacde8]" : " text-[#e4e5f1]"
          } `}
        >
          {task.title}
        </p>
      ) : (
        <p
          className={`${
            task.completed ? "line-through text-[#9394a5]" : "text-[#484b6a]"
          } `}
        >
          {task.title}
        </p>
      )}
      {activeHover && (
        <img
          src="icon-cross.svg"
          alt="close-button"
          className="ml-auto transition-all duration-300 h-4 max-[375px]:hidden cursor-pointer"
          onClick={handleDeleteTodo}
        />
      )}
      <img
        src="icon-cross.svg"
        alt="close-button"
        className="ml-auto transition-all duration-300 h-4 min-[375px]:hidden cursor-pointer"
        onClick={handleDeleteTodo}
      />
    </li>
  );
}

export default ToDoItem;
