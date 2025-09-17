import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { Task, TaskFormData } from "src/types/task/task";

interface TaskFormProps {
  onCancel?: () => void;
  onSubmit: (task: TaskFormData) => void;
  initialTask?: Task;
  isEditing?: boolean;
}

const TaskForm = ({
  onCancel,
  onSubmit,
  initialTask,
  isEditing = false,
}: TaskFormProps) => {
  const [task, setTask] = useState<TaskFormData>({
    description: initialTask?.description || "",
    status: initialTask?.status || "pendiente",
    dueDate: initialTask?.dueDate || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      description: task.description,
      status: task.status,
      dueDate: task.dueDate,
    });

    if (!isEditing) {
      setTask({ description: "", dueDate: "", status: "pendiente" });
    }
  };

  const handleTask = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div className="card bg-base-100 w-full shadow-sm mb-6">
      <div className="card-body">
        <div className="card-actions flex justify-between items-center">
          <p className="text-lg font-semibold">
            {isEditing ? "Editar Tarea" : "Nueva Tarea"}
          </p>
          <button className="btn btn-square btn-sm" onClick={onCancel}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset mx-auto mb-4">
            <label className="label">Descripción</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Describe tu tarea..."
              name="description"
              onChange={handleTask}
              value={task.description}
            />

            <label className="label">Fecha</label>
            <input
              type="date"
              className="input w-full"
              placeholder="Fecha"
              name="dueDate"
              onChange={handleTask}
            />

            <label className="label">Estatus</label>
            <select
              // defaultValue="Selecciona un estatus"
              name="status"
              className="select w-full"
              value={task.status}
              onChange={handleTask}
            >
              <option disabled={true}>Selecciona un estatus</option>
              <option value="pendiente">Pendiente</option>
              <option value="progreso">En progreso</option>
              <option value="completado">Completado</option>
            </select>
          </fieldset>
          <div className="card-actions flex">
            <button type="submit" className="btn btn-primary flex-1">
              <Plus className="h-6 w-6" /> {isEditing ? "Actualizar" : "Agregar Tarea"}
            </button>
            <button className="btn btn-outline" onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
