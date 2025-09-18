import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "@utils/dateConfig";
import type { Task, TaskFormData } from "@localTypes/task/task";
import { taskFormSchema, type TaskFormInputs } from "@schemas/TaskSchema";

interface TaskFormProps {
  initialTask?: Task;
  isEditing?: boolean;
  onCancel?: () => void;
  onSubmit: (task: TaskFormData) => void;
}

const TaskForm = ({ onCancel, onSubmit, initialTask, isEditing = false }: TaskFormProps) => {
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    reset,
    setValue,
    watch,
  } = useForm<TaskFormInputs>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      description: "",
      dueDate: dayjs().format("YYYY-MM-DD"),
      status: "pendiente",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (initialTask && isEditing) {
      setValue("description", initialTask.description);
      setValue("status", initialTask.status);
      setValue("dueDate", dayjs(initialTask.dueDate).format("YYYY-MM-DD"));
    }
  }, [initialTask, isEditing, setValue]);

  const handleCancel = () => {
    reset({
      description: "",
      dueDate: dayjs().format("YYYY-MM-DD"),
      status: "pendiente",
    });
    onCancel?.();
  };

  const onSubmitForm: SubmitHandler<TaskFormInputs> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      onSubmit({
        description: data.description,
        status: data.status,
        dueDate: data.dueDate || "",
      });

      if (!isEditing) {
        reset({
          description: "",
          dueDate: dayjs().format("YYYY-MM-DD"),
          status: "pendiente",
        });
      }
    } catch (error) {
      console.error("Error al procesar la tarea:", error);
    }
  };

  return (
    <div className="card bg-base-100 w-full shadow-sm mb-6">
      <div className="card-body">
        <div className="card-actions flex justify-between items-center">
          <p className="text-lg font-semibold">{isEditing ? "Editar Tarea" : "Nueva Tarea"}</p>
          <button className="btn btn-square btn-sm" onClick={onCancel}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <fieldset className="fieldset mx-auto mb-4 text-start">
            <div className="form-control">
              <label className="label" htmlFor="description">
                <span className="label-text">
                  Descripción <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="text"
                id="description"
                className={`input input-bordered w-full my-1 ${errors.description ? "input-error" : ""}`}
                placeholder="Describe tu tarea..."
                {...register("description")}
              />
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.description.message}&nbsp;</span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt">{watch("description")?.length || 0}/200 caracteres</span>
              </label>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="dueDate">
                <span className="label-text">
                  Fecha de vencimiento <span className="text-error">*</span>
                </span>
              </label>
              <input
                type="date"
                id="dueDate"
                min={dayjs().format("YYYY-MM-DD")}
                className={`input input-bordered w-full my-1 ${errors.dueDate ? "input-error" : ""}`}
                {...register("dueDate")}
              />
              {errors.dueDate && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.dueDate.message}</span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label" htmlFor="status">
                <span className="label-text">
                  Estatus <span className="text-error">*</span>
                </span>
              </label>
              <select
                className={`select select-bordered w-full my-1 ${errors.status ? "select-error" : ""}`}
                {...register("status")}
                id="status"
              >
                <option value="pendiente">Pendiente</option>
                <option value="progreso">En progreso</option>
                <option value="completado">Completado</option>
              </select>
              {errors.status && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.status.message}</span>
                </label>
              )}
            </div>
          </fieldset>
          <div className="card-actions flex gap-2">
            <button
              type="submit"
              className={`btn btn-primary flex-1 ${isSubmitting ? "loading" : ""}`}
              disabled={isSubmitting || !isValid}
            >
              {!isSubmitting && <Plus className="h-4 w-4" />}
              {isSubmitting ? "Procesando..." : isEditing ? "Actualizar Tarea" : "Agregar Tarea"}
            </button>
            <button type="button" className="btn btn-outline" onClick={handleCancel} disabled={isSubmitting}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
