import { useEffect, useMemo, useState } from "react";
import TaskStats from "@components/task/TaskStats";
import MainLayout from "./layouts/MainLayout";
import TaskForm from "@components/task/TaskForm";
import { Plus } from "lucide-react";
import TaskFilter from "@components/task/TaskFilter";
import TaskList from "@components/task/TaskList";
import useStore from "./store/taskStore";
import type { TaskFormData } from "./types/task/task";

function App() {
  const [showForm, setShowForm] = useState(false);
  const tasks = useStore.use.tasks();
  const addTask = useStore.use.addTask();
  const fetchTasks = useStore.use.fetchTasks();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = (task: TaskFormData) => {
    addTask(task);
    setShowForm(false);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [tasks, searchTerm]);

  return (
    <MainLayout>
      <TaskStats />
      <div className="flex justify-center mb-6">
        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus className="h-6 w-6" /> {showForm ? "Cancelar" : "Nueva Tarea"}
        </button>
      </div>
      {showForm && (
        <TaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowForm(false)}
        />
      )}
      <TaskFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <TaskList tasks={filteredTasks} />
    </MainLayout>
  );
}

export default App;
