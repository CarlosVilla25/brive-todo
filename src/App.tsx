import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import TaskStats from "@components/task/TaskStats";
import MainLayout from "@layouts/MainLayout";
import TaskForm from "@components/task/TaskForm";
import TaskFilter from "@components/task/TaskFilter";
import TaskList from "@components/task/TaskList";
import useStore from "@store/taskStore";
import { useConfirm } from "@hooks/useConfirm";
import type { TaskFormData, TaskStatus } from "@localTypes/task/task";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");

  const addTask = useStore.use.addTask();
  const fetchTasks = useStore.use.fetchTasks();
  const tasks = useStore.use.tasks();

  const { openConfirm, ConfirmComponent } = useConfirm();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = (task: TaskFormData) => {
    addTask(task);
    setShowForm(false);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || task.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchTerm, statusFilter]);

  return (
    <MainLayout>
      <TaskStats tasks={tasks} />
      <div className="flex justify-center mb-6">
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-6 w-6" /> {showForm ? "Cancelar" : "Nueva Tarea"}
        </button>
      </div>
      {showForm && <TaskForm onSubmit={handleAddTask} onCancel={() => setShowForm(false)} />}
      <TaskFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onStatusChange={(status) => setStatusFilter(status as TaskStatus | "all")}
        statusFilter={statusFilter}
      />
      <TaskList tasks={filteredTasks} openConfirm={openConfirm} />
      <ConfirmComponent />
    </MainLayout>
  );
}

export default App;
