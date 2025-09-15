import { CheckSquare } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-base-200 py-6">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <CheckSquare className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold text-balance">Gestor de Tareas</h1>
        </div>
        <p className="text-pretty">
          Organiza y gestiona tus tareas de manera simple y eficiente
        </p>
      </div>
    </header>
  );
};

export default Header;
