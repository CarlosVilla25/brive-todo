import { Filter, Search } from "lucide-react";

interface TaskFilterProps {
  searchTerm: string
  onSearchChange: (term: string) => void
}

const TaskFilter = ({ searchTerm, onSearchChange }: TaskFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <label className="input flex-1">
        <Search className="h-4 w-4 opacity-50" />
        <input
          type="search"
          className="grow w-full"
          placeholder="Buscar Tarea..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <kbd className="kbd kbd-sm">⌘</kbd>
        <kbd className="kbd kbd-sm">K</kbd>
      </label>
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <select defaultValue="Selecciona un estatus" className="select w-full">
          <option disabled={true}>Selecciona un estatus</option>
          <option value='pendiente'>Pendiente</option>
          <option value='progreso'>En progreso</option>
          <option value='completado'>Completado</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
