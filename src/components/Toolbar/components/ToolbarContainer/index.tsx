import { FC, ReactNode } from "react";

const ToolbarContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="fixed bottom-5 shadow-lg rounded-xl right-1/2 translate-x-1/2 bg-white dark:bg-zinc-900 dark:text-white p-3 flex gap-2 items-center">
      {children}
    </div>
  );
};

export default ToolbarContainer;
