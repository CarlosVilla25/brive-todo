import { CheckSquare, Trash2 } from "lucide-react";
import TaskItem from "@components/task/TaskItem";
import type { Task } from "@localTypes/task/task";
import useStore from "@store/taskStore";

interface TaskListProps {
  tasks: Task[];
  openConfirm: any;
}

const TaskList = ({ tasks, openConfirm }: TaskListProps) => {
  const deleteTask = useStore.use.deleteTask();
  const updateTask = useStore.use.updateTask();

  const handleDeleteTask = (taskId: string) => {
    openConfirm({
      title: "Eliminar Tarea",
      message: "¿Estás seguro de que deseas eliminar esta tarea?",
      confirmText: "Eliminar",
      variant: "danger",
      icon: <Trash2 className="w-6 h-6" />,
      onConfirm: () => {
        deleteTask(taskId);
      },
    });
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    updateTask(id, updates);
  };

  return (
    <div className="text-center">
      {tasks?.length === 0 ? (
        <div className="text-center py-12">
          <CheckSquare className="h-16 w-16 mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">No hay tareas aún</p>
          <p className="text-pretty">Comienza agregando tu primera tarea usando el botón de arriba</p>
        </div>
      ) : (
        tasks?.map((task) => (
          <TaskItem onUpdate={handleUpdateTask} onDelete={handleDeleteTask} key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;
