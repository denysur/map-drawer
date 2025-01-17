import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Close from "../../Icons/Close";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="animate-fadeIn fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-96 rounded-lg shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <Close />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
