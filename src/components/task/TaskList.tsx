import { CheckSquare } from "lucide-react";
import TaskItem from "./TaskItem";
import type { Task } from "src/types/task/task";
import useStore from "../../store/taskStore";

interface TaskListProps {
  tasks: Task[];
}

const TaskList = ({ tasks }: TaskListProps) => {
  const deleteTask = useStore.use.deleteTask();
  const updateTask = useStore.use.updateTask();

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
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
          <p className="text-pretty">
            Comienza agregando tu primera tarea usando el botón de arriba
          </p>
        </div>
      ) : (
        // <TaskItem />
        tasks?.map((task) => (
          <TaskItem
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
            key={task.id}
            task={task}
          />
        ))
      )}
    </div>
  );
};

export default TaskList;
