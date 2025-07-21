import { FC, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

import { Close } from "../../Icons";
import clsx from "clsx";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
  className?: string;
};

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
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
      className={`z-30 fixed inset-0  h-dvh flex items-center justify-center md:p-4 ${
        !isVisible ? "animate-fadeOut" : "animate-fadeIn"
      }`}
      id="modal"
    >
      <div
        className="w-full h-full fixed inset-0 bg-black/60"
        onClick={handleClose}
      ></div>

      <div
        className={clsx(
          "overflow-hidden z-20 ease duration-200 dark:bg-zinc-900 dark:text-white flex flex-col bg-white max-h-full w-full max-w-3xl shadow-lg relative h-full md:rounded-xl md:h-auto",
          className
        )}
      >
        <button
          className={`absolute z-20 p-2 rounded-lg ease duration-200 text-zinc-500 hover:bg-black/[.1] hover:text-black dark:hover:bg-white/[.05] dark:hover:text-white ${title ? "top-[10px] right-[10px]" : "top-1 right-1"}`}
          onClick={handleClose}
        >
          <Close />
        </button>
        {title && (
          <div className="flex justify-between items-center px-4 py-3">
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
