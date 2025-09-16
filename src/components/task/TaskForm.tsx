import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { TaskFormData } from "src/types/task/task";

interface TaskFormProps {
  onCancel: () => void;
  onSubmit: (task: TaskFormData) => void;
}

const TaskForm = ({ onCancel, onSubmit }: TaskFormProps) => {
  const [task, setTask] = useState<TaskFormData>({
    description: "",
    status: "pendiente",
    dueDate: null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      description: task.description,
      status: task.status,
      dueDate: task.dueDate
    });
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
          <p className="text-lg font-semibold">Nueva Tarea</p>
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
            <input type="date" className="input w-full" placeholder="date" name="dueDate" onChange={handleTask} />

            <label className="label">Estatus</label>
            <select
              // defaultValue="Selecciona un estatus"
              name="status"
              className="select w-full"
              value={task.status}
              onChange={handleTask}
            >
              <option disabled={true}>Selecciona un estatus</option>
              <option value='pendiente'>Pendiente</option>
              <option value='en-progreso'>En progreso</option>
              <option value='completado'>Completado</option>
            </select>
          </fieldset>
          <div className="card-actions flex">
            <button type="submit" className="btn btn-primary flex-1">
              <Plus className="h-6 w-6" /> Agregar Tarea
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
