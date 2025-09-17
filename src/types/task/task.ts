export type TaskStatus = "pendiente" | "progreso" | "completado";

export interface Task {
  id: string;
  description: string;
  createdAt: Date;
  dueDate: string;
  status: TaskStatus;
}

export interface TaskFilters {
  status?: TaskStatus | "all";
  texto?: string;
}

export interface TaskFormData {
  description: string;
  dueDate: string;
  status: TaskStatus;
}
