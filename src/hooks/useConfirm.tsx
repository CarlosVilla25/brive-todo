import React, { useState, useCallback, type ReactNode } from "react";

interface ConfirmOptions {
  cancelText?: string;
  confirmText?: string;
  icon?: ReactNode;
  message?: string;
  title?: string;
  variant?: "danger" | "warning" | "info";
  onCancel?: () => void;
  onConfirm: () => void;
}

interface ConfirmModalProps extends ConfirmOptions {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  cancelText = "Cancelar",
  confirmText = "Confirmar",
  icon,
  isOpen,
  message = "Esta acción no se puede deshacer.",
  onCancel,
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  variant = "danger",
}) => {
  const modalId = "confirm-modal";

  const getVariantClasses = () => {
    switch (variant) {
      case "danger":
        return {
          button: "btn-error",
          iconBg: "bg-error/10 text-error",
        };
      case "warning":
        return {
          button: "btn-warning",
          iconBg: "bg-warning/10 text-warning",
        };
      case "info":
        return {
          button: "btn-info",
          iconBg: "bg-info/10 text-info",
        };
      default:
        return {
          button: "btn-error",
          iconBg: "bg-error/10 text-error",
        };
    }
  };

  const classes = getVariantClasses();

  React.useEffect(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal && isOpen) {
      modal.showModal();
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box max-w-md">
        <div className="flex items-start gap-4">
          {icon && (
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${classes.iconBg}`}>
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-base-content/80 mb-6">{message}</p>
          </div>
        </div>
        <div className="modal-action justify-end gap-2">
          <button type="button" className="btn btn-outline" onClick={handleCancel}>
            {cancelText}
          </button>
          <button type="button" className={`btn ${classes.button}`} onClick={handleConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleCancel}>
          close
        </button>
      </form>
    </dialog>
  );
};

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);

  const openConfirm = useCallback((confirmOptions: Omit<ConfirmOptions, "onConfirm"> & { onConfirm: () => void }) => {
    setOptions(confirmOptions);
    setIsOpen(true);
  }, []);

  const closeConfirm = useCallback(() => {
    setIsOpen(false);
    setOptions(null);
  }, []);

  const ConfirmComponent = () =>
    options ? <ConfirmModal {...options} isOpen={isOpen} onClose={closeConfirm} /> : null;

  return {
    openConfirm,
    closeConfirm,
    ConfirmComponent,
    isOpen,
  };
};
