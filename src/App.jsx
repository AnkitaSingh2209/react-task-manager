
import { useState , useEffect} from "react";
import "./App.css";



function App() {
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});
  const [taskInput, setTaskInput] = useState("");

  const [editId, setEditId] = useState(null);
const [editText, setEditText] = useState("");
const [filter, setFilter] = useState("all");
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

const filteredTasks = tasks.filter((task) => {
  if (filter === "active") {
    return !task.completed;
  }

  if (filter === "completed") {
    return task.completed;
  }

  return true;
});
const totalTasks = tasks.length;

const completedTasks = tasks.filter((task) => task.completed).length;

const activeTasks = tasks.filter((task) => !task.completed).length;
  return (
    <div className="app">
      <h1>My Task Manager</h1>
      <p>Organize your day, one task at a time.</p>
<p>
  Total: {totalTasks} | Active: {activeTasks} | Completed: {completedTasks}
</p>


      <div>
  <button onClick={() => setFilter("all")}>
    All
  </button>

  <button onClick={() => setFilter("active")}>
    Active
  </button>

  <button onClick={() => setFilter("completed")}>
    Completed
  </button>
</div>

      <input
        type="text"
        placeholder="Enter a task..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={() => {
 setTasks([
  ...tasks,
  {
    id: Date.now(),
    text: taskInput,
    completed: false
  }
]);
  setTaskInput("");
}}>
  Add Task
</button>
<ul>
{filteredTasks.map((task, index) => (
    <li key={task.id}>
      <input
  type="checkbox"
  checked={task.completed}
  onChange={() => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id
          ? { ...t, completed: !t.completed }
          : t
      )
    );
  }}
/>

{editId === task.id ? (
  <>
    <input
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
    />

    <button onClick={() => {
      setTasks(
        tasks.map((t) =>
          t.id === task.id
            ? { ...t, text: editText }
            : t
        )
      );
      setEditId(null);
      setEditText("");
    }}>
      Save
    </button>
  </>
) : (
  <span
    style={{
      textDecoration: task.completed ? "line-through" : "none"
    }}
  >
    {task.text}
  </span>
)}
<button onClick={() => {
  setEditId(task.id);
  setEditText(task.text);
}}>
  Edit
</button>

      <button onClick={() => {
        setTasks(tasks.filter((_, i) => i !== index));
      }}>
        Delete
      </button>
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;
