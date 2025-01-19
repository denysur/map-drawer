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
  const [isFullyClosed, setIsFullyClosed] = useState(true);

  const handleClose = () => {
    if (!isVisible) return;
    setIsVisible(false);
    onClose();
    setIsFullyClosed(false);
    setTimeout(() => {
      setIsFullyClosed(true);
      if (isOpen) onClose();
      setIsVisible(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsFullyClosed(false);
    } else {
      handleClose();
    }
  }, [isOpen]);

  if (isFullyClosed) {
    return null;
  }

  return createPortal(
    <div
      className={`z-20 fixed inset-0 p-4 h-dvh flex items-center justify-center ${
        !isVisible ? "animate-fadeOut" : "animate-fadeIn"
      }`}
    >
      <div
        className="w-full h-full fixed inset-0 bg-black/60"
        onClick={handleClose}
      ></div>
      <div className="overflow-hidden z-10 dark:bg-zinc-900 dark:text-white flex flex-col bg-white max-h-full w-full max-w-[768px] rounded-xl shadow-lg relative">
        <button
          className="absolute p-2 top-1 right-1 rounded-lg ease duration-200 text-zinc-500 hover:bg-black/[.1] hover:text-black dark:hover:bg-white/[.05] dark:hover:text-white"
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
