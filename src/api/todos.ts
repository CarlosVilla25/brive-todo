import axios from "axios";
import type { Task } from "@localTypes/task/task";

const api = axios.create({ baseURL: "http://localhost:3001" });

const handleApi = async <T>(promise: Promise<{ data: T }>): Promise<T> => {
  try {
    const res = await promise;
    return res.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error("No hay respuesta del servidor.");
    } else {
      throw new Error("Error desconocido al llamar a la API.");
    }
  }
};

export const getTasks = async (): Promise<Task[]> => handleApi(api.get("/tasks"));

export const addTask = async (task: Omit<Task, "id">): Promise<Task> =>
  handleApi(api.post("/tasks", task, { headers: { "Content-Type": "application/json" } }));

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> =>
  handleApi(api.patch(`/tasks/${id}`, updates));

export const deleteTask = async (id: string): Promise<void> => handleApi(api.delete(`tasks/${id}`));
