import { AlertCircle, CheckCircle, Clock, ListTodo } from "lucide-react";
import type { Task } from "@localTypes/task/task";

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  const stats = {
    total: tasks.length,
    pendiente: tasks.filter((task) => task.status === "pendiente").length,
    progreso: tasks.filter((task) => task.status === "progreso").length,
    completado: tasks.filter((task) => task.status === "completado").length,
  };

  const statItems = [
    {
      label: "Total",
      value: stats.total,
      icon: ListTodo,
      color: "text-base-300",
      bgColor: "bg-primary",
    },
    {
      label: "Pendientes",
      value: stats.pendiente,
      icon: AlertCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      label: "En Progreso",
      value: stats.progreso,
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Completadas",
      value: stats.completado,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {statItems.map((stat) => {
        return (
          <div key={stat.label} className="card bg-base-100 card-lg shadow-sm py-6">
            <div className="card-body p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5" ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm">{stat.label}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskStats;
