import React from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const TaskItem = ({
  task,
  handleEditTask,
  handleDeleteTask,
  handleTaskCheckboxToggle,
}) => {
  return (
    <div className="todo flex my-3 justify-between items-start">
      <div className="flex gap-2 items-start">
        <input
          name={task.id}
          onChange={handleTaskCheckboxToggle}
          type="checkbox"
          checked={task.isCompleted}
          className="mt-[6px]"
        />

        <div className="flex flex-col">
          <div
            className={`${
              task.isCompleted ? "line-through" : ""
            } break-words max-w-[220px] xl:max-w-[350px]`}
          >
            {task.todo}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Priority:{" "}
            <span
              className={`font-semibold ${
                task.priority === "High"
                  ? "text-red-600"
                  : task.priority === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              {task.priority}
            </span>
            <br />
            Deadline:{" "}
            {task.deadline
              ? new Date(task.deadline).toLocaleString()
              : "N/A"}
          </div>
        </div>
      </div>

      <div className="buttons flex ml-2 mt-1">
        <button
          onClick={(e) => handleEditTask(e, task.id)}
          className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
        >
          <FaEdit />
        </button>
        <button
          onClick={(e) => handleDeleteTask(e, task.id)}
          className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
