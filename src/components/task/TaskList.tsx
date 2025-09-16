import { CheckSquare } from "lucide-react";
import TaskItem from "./TaskItem";

const TaskList = () => {
  return (
    <div className="text-center">
      <div className="text-center py-12">
        <CheckSquare className="h-16 w-16 mx-auto mb-4" />
        <p className="text-lg font-medium mb-2">No hay tareas aún</p>
        <p className="text-pretty">
          Comienza agregando tu primera tarea usando el botón de arriba
        </p>
      </div>
      <TaskItem />
    </div>
  );
};

export default TaskList;
