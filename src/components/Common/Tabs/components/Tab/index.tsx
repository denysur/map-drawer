import { FC } from "react";

export interface TabProps {
  label: string;
  children: (setActiveTabById: (id: string) => void) => React.ReactNode;
  id: string;
  setActiveTabById?: (id: string) => void;
}
export interface TabContentProps {
  setTab: (id: string) => void;
}

const Tab: FC<TabProps> = ({ children, setActiveTabById }) => {
  return children(setActiveTabById ?? (() => {}));
};

export default Tab;
