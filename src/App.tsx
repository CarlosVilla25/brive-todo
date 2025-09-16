import { useState } from "react";
import TaskStats from "@components/task/TaskStats";
import MainLayout from "./layouts/MainLayout";
import TaskForm from "@components/task/TaskForm";
import { Plus } from "lucide-react";
import TaskFilter from "@components/task/TaskFilter";
import TaskList from "@components/task/TaskList";

function App() {
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = () => {
    console.log("Adding new task...");
  };

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
      <TaskFilter />
      <TaskList />
    </MainLayout>
  );
}

export default App;
