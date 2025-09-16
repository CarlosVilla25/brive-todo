export type TaskStatus = "pendiente" | "en-progreso" | "completado";

export interface Task {
  id: string;
  description: string;
  createdAt: Date;
  dueDate: Date;
  status: TaskStatus;
}

export interface TaskFilters {
  status?: TaskStatus | "all";
  texto?: string;
}

export interface TaskFormData {
  description: string;
  dueDate: Date | null;
  status: TaskStatus;
}
