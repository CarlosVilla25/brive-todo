import z from "zod";
import dayjs from "@utils/dateConfig";

export const taskFormSchema = z.object({
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .min(3, "La descripción debe tener al menos 3 caracteres")
    .max(200, "La descripción no puede exceder 200 caracteres")
    .trim(),

  dueDate: z
    .string()
    .min(1, "La fecha es requerida")
    .refine((date) => {
      const selectedDate = dayjs(date);
      const today = dayjs().startOf("day");
      return selectedDate.isSameOrAfter(today);
    }, "La fecha no puede ser anterior a hoy"),

  status: z.enum(["pendiente", "progreso", "completado"], {
    error: () => ({ message: "Selecciona un estatus válido" }),
  }),
});

export type TaskFormInputs = z.infer<typeof taskFormSchema>;
