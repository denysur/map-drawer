import { FC, ReactNode } from "react";

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <div className="w-screen h-dvh dark:bg-zinc-900 dark:text-white flex overflow-hidden">
      <div className="animate-fadeIn flex w-full">{children}</div>
    </div>
  </>
);

export default Layout;
