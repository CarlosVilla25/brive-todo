import { create } from "zustand";
import type { Task, TaskFormData } from "@localTypes/task/task";
import { addTask, deleteTask, getTasks, updateTask } from "@api/todos";
import dayjs from "@utils/dateConfig";
import createSelectors from "@store/taskWithSelectors";

interface TaskStore {
  tasks: Task[];
  loading: boolean;

  fetchTasks: () => void;
  addTask: (taskData: TaskFormData) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

const useTaskStore = create<TaskStore>((set) => ({
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
        createdAt: dayjs().toISOString(),
        dueDate: dayjs(taskData.dueDate).toISOString(),
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
      const normalizedUpdates = { ...updates };

      if (updates.dueDate) {
        normalizedUpdates.dueDate = dayjs(updates.dueDate).toISOString();
      }
      const updatedTask = await updateTask(id, normalizedUpdates);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
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
}));

export default createSelectors(useTaskStore);
