import { FC, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

import { Close } from "../../Icons";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
};

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
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
          className="absolute z-10 p-2 top-2 right-2 rounded-lg ease duration-200 text-zinc-500 hover:bg-black/[.1] hover:text-black dark:hover:bg-white/[.05] dark:hover:text-white"
          onClick={handleClose}
        >
          <Close />
        </button>
        <div className="h-full flex flex-col overflow-auto">
          {title && (
            <div className="bg-gradient-to-b from-white dark:from-zinc-900 from-25% to-transparent top-0 sticky flex justify-between items-center px-4 pt-3 pb-5">
              <h2 className="text-2xl font-bold">{title}</h2>
            </div>
          )}
          <div className={`h-full`}>{children}</div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
