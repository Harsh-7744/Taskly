import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  showCompleted,
  handleEditTask,
  handleDeleteTask,
  handleTaskCheckboxToggle,
  isEditing
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold">Your Todos</h2>
      <div className="todos">
        {tasks.length === 0 && <div className="m-5">No Todos to display</div>}
        {tasks.map(
          (task) =>
            (showCompleted || !task.isCompleted) && (
              <TaskItem
                key={task.id}
                task={task}
                handleEditTask={handleEditTask}
                handleDeleteTask={handleDeleteTask}
                handleTaskCheckboxToggle={handleTaskCheckboxToggle}
                isEditing={isEditing}
              />
            )
        )}
      </div>
    </>
  );
};

export default TaskList;
