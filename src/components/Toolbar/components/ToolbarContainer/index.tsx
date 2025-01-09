import { FC, ReactNode } from "react";

const ToolbarContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="fixed bottom-5 rounded right-1/2 translate-x-1/2 bg-gray-100 p-3 flex gap-2 items-center">
      {children}
    </div>
  );
};

export default ToolbarContainer;
