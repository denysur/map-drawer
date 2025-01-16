import { FC, ReactNode } from "react";

const LoginContent: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="flex flex-col w-full items-center mt-60">{children}</div>
);

export default LoginContent;
