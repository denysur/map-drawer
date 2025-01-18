import { FC, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

import { Close } from "../../Icons";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen && !isVisible) {
    return null;
  }

  return createPortal(
    <div
      className={`z-20 fixed inset-0 p-4 h-dvh bg-black bg-opacity-60 flex items-center justify-center ${
        isVisible ? "animate-fadeIn" : "animate-fadeOut"
      }`}
      onClick={handleClose}
    >
      <div
        className="overflow-hidden flex flex-col bg-white max-h-full w-full max-w-[768px] rounded-xl shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute p-2 top-1 right-1 rounded-lg ease duration-200 text-gray-600 hover:bg-black/[.1] hover:text-gray-900"
          onClick={handleClose}
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
