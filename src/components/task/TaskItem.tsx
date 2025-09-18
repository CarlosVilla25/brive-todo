import { useState } from "react";
import { Calendar, Clock, Edit2, Trash2 } from "lucide-react";
import type { Task } from "@localTypes/task/task";
import TaskForm from "@components/task/TaskForm";
import dayjs from "@utils/dateConfig";

interface TaskItemProps {
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  task: Task;
}

const statusColors = {
  pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  progreso: "bg-blue-100 text-blue-800 border-blue-200",
  completado: "bg-green-100 text-green-800 border-green-200",
};

const statusLabels = {
  pendiente: "Pendiente",
  progreso: "En Progreso",
  completado: "Completado",
};

const TaskItem = ({ task, onDelete, onUpdate }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (updatedTask: Omit<Task, "id" | "createdAt">) => {
    onUpdate(task.id, updatedTask);
    setIsEditing(false);
  };

  if (isEditing) {
    return <TaskForm onCancel={() => setIsEditing(false)} onSubmit={handleEdit} isEditing={true} initialTask={task} />;
  }

  return (
    <div className="card card-border bg-base-100 mb-4">
      <div className="card-body">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-medium text-start leading-relaxed mb-3">{task.description}</p>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{dayjs(task.dueDate).format("DD/MM/YYYY")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Creado {dayjs(task.createdAt).format("DD/MM/YYYY")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
              {statusLabels[task.status]}
            </span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-1">
            <button className="btn btn-ghost" onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4" />
            </button>
            <button className="btn btn-ghost hover:bg-error" onClick={() => onDelete(task.id)}>
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
