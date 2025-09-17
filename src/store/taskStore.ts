import { create } from "zustand";
import createSelectors from "./taskWithSelectors";
import type {
  Task,
  TaskFilters,
  TaskStatus,
  TaskFormData,
} from "../types/task/task";
import { addTask, deleteTask, getTasks, updateTask } from "../api/todos";

// export interface TaskFormData {
//   description: string;
//   createdAt: Date;
//   dueDate: Date;
//   status: TaskStatus;
// }

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  // filters: TaskFilters;

  fetchTasks: () => void;
  addTask: (taskData: TaskFormData) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  // updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;

  // setFilters: (filters: TaskFilters) => void;
  // getFilteredTasks: () => Task[];
  // clearFilters: () => void;

  // getTaskById: (id: string) => Task | undefined;
  // getTasksByStatus: (status: TaskStatus) => Task[];
}

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  filter: {},

  fetchTasks: async () => {
    set({ loading: true });
    try {
      const data = await getTasks();
      set({ tasks: data, loading: false });
    } catch (error) {
      set({ loading: false });
    }
  },

  addTask: async (taskData: TaskFormData) => {
    set({ loading: true });

    try {
      const newTask: Task = {
        id: crypto.randomUUID(),
        description: taskData.description.trim(),
        createdAt: new Date(),
        dueDate: taskData.dueDate,
        status: taskData.status,
      };

      await addTask(newTask);

      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
  updateTask: async (id: string, updates: Partial<Task>) => {
    set({ loading: true });
    try {
      const updated = await updateTask(id, updates);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updated : task)),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
  // updateTaskStatus: (id: string, status: TaskStatus) => {},
  deleteTask: async (id: string) => {
    set({ loading: true });
    try {
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
    }
  },
  // getFilteredTasks: () => {},
  // clearFilters: () => {},
  // getTaskById: (id: string) => {},
  // getTasksByStatus: (status: TaskStatus) => {},
}));

export default createSelectors(useTaskStore);
