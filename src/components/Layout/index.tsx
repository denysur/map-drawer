import { FC, ReactNode } from "react";

import Logo from "../Logo";

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <Logo />
    <div className="w-screen h-screen flex">
      <div className="animate-fadeIn flex w-full">{children}</div>
    </div>
  </>
);

export default Layout;
