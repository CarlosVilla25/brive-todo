import { create } from "zustand";
import createSelectors from "./taskWithSelectors";
import type { Task, TaskFilters, TaskStatus } from "../types/task/task";

export interface TaskFormData {
  description: string;
  createdAt: Date;
  dueDate: Date;
  status: TaskStatus;
}

interface TaskStore {
  tasks: Task[];
  // filters: TaskFilters;

  addTask: (taskData: TaskFormData) => void;
  // updateTask: (id: string, updates: Partial<Task>) => void;
  // updateTaskStatus: (id: string, status: TaskStatus) => void;
  // deleteTask: (id: string) => void;

  // setFilters: (filters: TaskFilters) => void;
  // getFilteredTasks: () => Task[];
  // clearFilters: () => void;

  // getTaskById: (id: string) => Task | undefined;
  // getTasksByStatus: (status: TaskStatus) => Task[];
}

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: Boolean,
  filter: {},

  addTask: (taskData: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      description: taskData.description.trim(),
      createdAt: new Date(),
      dueDate: taskData.dueDate,
      status: taskData.status,
    };

    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },
  // updateTask: (id: string, updates: Partial<Task>) => {},
  // updateTaskStatus: (id: string, status: TaskStatus) => {},
  // deleteTask: (id: string) => {},
  // getFilteredTasks: () => {},
  // clearFilters: () => {},
  // getTaskById: (id: string) => {},
  // getTasksByStatus: (status: TaskStatus) => {},
}));

export default createSelectors(useTaskStore);
