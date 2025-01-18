import React, { useEffect } from "react";
import ReactDOM from "react-dom";

import { Close } from "../../Icons";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
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
      className="animate-fadeIn z-20 fixed inset-0 p-4 h-dvh bg-black bg-opacity-60 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="overflow-hidden flex flex-col bg-white max-h-full w-full max-w-[768px] rounded-xl shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute p-2 top-1 right-1 rounded-lg ease duration-200 text-gray-600 hover:bg-black/[.1] hover:text-gray-900"
          onClick={onClose}
        >
          <Close />
        </button>
        <div className="overflow-auto h-full p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
