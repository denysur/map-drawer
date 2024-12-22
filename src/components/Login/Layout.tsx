import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="w-screen h-screen flex justify-center">
    <div className="animate-fadeIn flex flex-col items-center mt-60">
      {children}
    </div>
  </div>
);

export default Layout;
