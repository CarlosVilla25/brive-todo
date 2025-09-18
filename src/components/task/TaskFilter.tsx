import { useMemo, useRef } from "react";
import { Filter, Search } from "lucide-react";
import useKeyboardShortcut from "@hooks/useKeyboardShortcut";

interface TaskFilterProps {
  onClear?: () => void;
  onSearchChange: (term: string) => void;
  onStatusChange?: (status: string) => void;
  searchTerm: string;
  statusFilter?: string;
}

const TaskFilter = ({ searchTerm, statusFilter = "all", onSearchChange, onStatusChange, onClear }: TaskFilterProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { os } = useKeyboardShortcut(inputRef);

  const shortcutElements = useMemo(() => {
    switch (os) {
      case "mac":
        return (
          <>
            <kbd className="kbd kbd-sm">⌘</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </>
        );
      case "windows":
        return (
          <>
            <kbd className="kbd kbd-sm">Ctrl</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </>
        );
      default:
        return (
          <>
            <kbd className="kbd kbd-sm">Ctrl</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </>
        );
    }
  }, [os]);

  const shortcutTooltip = useMemo(() => {
    switch (os) {
      case "mac":
        return "Presiona ⌘K para buscar";
      case "windows":
        return "Presiona Ctrl+K para buscar";
      default:
        return "Presiona Ctrl+K para buscar";
    }
  }, [os]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange?.(e.target.value);
  };

  const hasActiveFilters = searchTerm.length > 0 || (statusFilter && statusFilter !== "all");

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="tooltip tooltip-bottom w-full" data-tip={shortcutTooltip}>
          <label className="input input-bordered flex items-center gap-2 w-full">
            <Search className="h-4 w-4 opacity-50" />
            <input
              ref={inputRef}
              type="search"
              className="grow"
              placeholder="Buscar tareas..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />

            <div className="flex gap-1">{shortcutElements}</div>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2 min-w-48">
        <Filter className="h-4 w-4 opacity-70" />
        <select value={statusFilter} onChange={handleStatusChange} className="select select-bordered w-full">
          <option value="all">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="progreso">En progreso</option>
          <option value="completado">Completado</option>
        </select>
      </div>

      {hasActiveFilters && onClear && (
        <button onClick={onClear} className="btn btn-outline btn-sm" aria-label="Limpiar todos los filtros">
          Limpiar
        </button>
      )}
    </div>
  );
};

export default TaskFilter;
