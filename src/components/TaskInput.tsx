import React from "react";

const TaskInput = ({
  newTaskText,
  newTaskPriority,
  newTaskDeadline,
  setNewTaskText,
  setNewTaskPriority,
  setNewTaskDeadline,
  handleAddTask,
}) => {
  return (
    <div className="addTodo my-5 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Add a Todo</h2>
      <div className="flex flex-col gap-4">
        <input
          onChange={(e) => setNewTaskText(e.target.value)}
          value={newTaskText}
          type="text"
          placeholder="Enter your task"
          className="w-full rounded-full px-5 py-2 border bg-white"
        />

        <div className="flex flex-col gap-2">
          <label className="font-medium">Priority:</label>
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            className="rounded-md px-3 py-1"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <label className="font-medium mt-2">Deadline (Date & Time):</label>
          <input
            type="datetime-local"
            value={newTaskDeadline}
            onChange={(e) => setNewTaskDeadline(e.target.value)}
            className="rounded-md px-3 py-1"
          />
        </div>

        <button
          onClick={handleAddTask}
          disabled={newTaskText.length <= 3}
          className="bg-violet-800 mt-2 rounded-full hover:bg-violet-950 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TaskInput;
