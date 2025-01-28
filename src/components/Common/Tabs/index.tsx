import { FC, ReactElement, useState, cloneElement } from "react";
import { TabProps } from "./components/Tab";
import Burger from "../../Icons/Burger";

interface TabsProps {
  children: ReactElement<TabProps>[] | ReactElement<TabProps>;
}

const Tabs: FC<TabsProps> = ({ children }) => {
  if (!Array.isArray(children)) {
    return children;
  }

  const [activeTab, setActiveTab] = useState(0);
  const [showTabs, setShowTabs] = useState(false);

  const handleTabsToggle = () => {
    setShowTabs(!showTabs);
  };

  const setActiveTabById = (id: string) => {
    const index = children.findIndex((child) => child.props.id === id);
    if (index !== -1) {
      setActiveTab(index);
    }
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div
      className={`relative h-full w-full overflow-auto flex ${showTabs ? "flex-col" : ""} md:flex-row`}
    >
      <div
        className={`w-full gap-2 p-4 max-md:!max-w-full ${showTabs ? "bg-gray-200 dark:bg-zinc-800 flex flex-col md:sticky md:top-0" : "absolute top-0 left-0 max-md:!w-full"}`}
        style={{
          maxWidth: "min(33.333333%, 288px)",
        }}
      >
        <button
          className="w-full rounded-lg ease duration-200 flex gap-2 text-center px-4 py-3 md:px-4 md:py-2 hover:bg-black/10 dark:hover:bg-white/10 dark:text-white"
          onClick={handleTabsToggle}
        >
          <Burger /> <span>{showTabs ? "Сховати таби" : "Показати таби"}</span>
        </button>
        {showTabs &&
          children.map((tab, index) => (
            <button
              key={index}
              className={`rounded-lg px-4 py-3 md:px-4 md:py-2 ease duration-200 text-left ${
                index === activeTab
                  ? "bg-blue-500 text-white dark:bg-blue-700 dark:text-white font-semibold"
                  : "text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.props.label}
            </button>
          ))}
      </div>
      <div
        className={`p-8 w-full min-h-full h-full bg-white dark:bg-zinc-900 ${!showTabs && "pt-16"}`}
      >
        {cloneElement(children[activeTab], {
          setActiveTabById: setActiveTabById,
        })}
      </div>
    </div>
  );
};

export default Tabs;
export { default as Tab } from "./components/Tab";
