import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedTasks = tasks.map((task) => {
        if (
          task.deadline &&
          !task.isCompleted &&
          !task.missedDeadline &&
          new Date(task.deadline) < now
        ) {
          alert(`⏰ Deadline missed for: "${task.todo}"`);
          return { ...task, missedDeadline: true };
        }
        return task;
      });
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
    }, 30000);

    return () => clearInterval(interval);
  }, [tasks]);

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      todo: newTaskText,
      isCompleted: false,
      priority: newTaskPriority,
      deadline: newTaskDeadline,
      missedDeadline: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    setNewTaskText("");
    setNewTaskDeadline("");
    setNewTaskPriority("Medium");
  };

  const handleTaskInputChange = (e) => {
    setNewTaskText(e.target.value);
  };

  const handleEditTask = (e, id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setNewTaskText(taskToEdit.todo);
    setNewTaskPriority(taskToEdit.priority || "Medium");
    setNewTaskDeadline(taskToEdit.deadline || "");
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleDeleteTask = (e, id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleTaskCheckboxToggle = (e) => {
    const id = e.target.name;
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  return (
    <>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">
        <h1 className="font-bold text-center text-3xl">
          Taskly - Track it. Crack it. Done.
        </h1>

        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Add a Todo</h2>
          <div className="flex flex-col gap-4">
            <input
              onChange={handleTaskInputChange}
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

              <label className="font-medium mt-2">
                Deadline (Date & Time):
              </label>
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

        <input
          className="my-4"
          id="show"
          onChange={toggleShowCompleted}
          type="checkbox"
          checked={showCompleted}
        />
        <label className="mx-2" htmlFor="show">
          Show Completed
        </label>

        <div className="h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2"></div>

        <h2 className="text-2xl font-bold">Your Todos</h2>
        <div className="todos">
          {tasks.length === 0 && <div className="m-5">No Todos to display</div>}
          {tasks.map((task) => {
            return (
              (showCompleted || !task.isCompleted) && (
                <div
                  key={task.id}
                  className="todo flex my-3 justify-between items-start"
                >
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
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
