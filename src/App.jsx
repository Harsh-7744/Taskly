import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
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
    setIsEditing(false)
  };

  const handleEditTask = (e, id) => {
    setIsEditing(true)
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
    <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[40%]">
      <h1 className="font-bold text-center text-3xl">
        Taskly - Track it. Crack it. Done.
      </h1>

      <TaskInput
        newTaskText={newTaskText}
        newTaskPriority={newTaskPriority}
        newTaskDeadline={newTaskDeadline}
        setNewTaskText={setNewTaskText}
        setNewTaskPriority={setNewTaskPriority}
        setNewTaskDeadline={setNewTaskDeadline}
        handleAddTask={handleAddTask}
      />

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

      <TaskList
        tasks={tasks}
        showCompleted={showCompleted}
        handleEditTask={handleEditTask}
        handleDeleteTask={handleDeleteTask}
        handleTaskCheckboxToggle={handleTaskCheckboxToggle}
        isEditing={isEditing}
      />
    </div>
  );
}

export default App;
