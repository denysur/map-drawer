import { FC } from "react";
import Tabs, { Tab } from "../Common/Tabs";
import StartGuide from "./components/StartGuide";
import MarkerGuide from "./components/MarkerGuide";
import MarkerSettingsGuide from "./components/MarkerSettingsGuide";
import DrawGuide from "./components/DrawGuide";
import IconsGuide from "./components/IconsGuide";
import DrawSettingsGuide from "./components/DrawSettingsGuide";
import ArrowGuide from "./components/ArrowGuide";
import ArrowSettingsGuide from "./components/ArrowSettingsGuide";

const GuideModal: FC = () => {
  return (
    <Tabs>
      <Tab id="start" label="Вступ">
        {(setTab) => <StartGuide setTab={setTab} />}
      </Tab>
      <Tab id="marker-guide" label="Маркер">
        {(setTab) => <MarkerGuide setTab={setTab} />}
      </Tab>
      <Tab id="marker-settings" label="Налаштування маркеру">
        {(setTab) => <MarkerSettingsGuide setTab={setTab} />}
      </Tab>
      <Tab id="icons-guide" label="Іконки">
        {(setTab) => <IconsGuide setTab={setTab} />}
      </Tab>
      <Tab id="draw-guide" label="Креслення">
        {(setTab) => <DrawGuide setTab={setTab} />}
      </Tab>
      <Tab id="draw-settings" label="Налаштування креслення">
        {(setTab) => <DrawSettingsGuide setTab={setTab} />}
      </Tab>
      <Tab id="arrow-guide" label="Стрілки">
        {(setTab) => <ArrowGuide setTab={setTab} />}
      </Tab>
      <Tab id="arrow-settings" label="Налаштування стрілок">
        {(setTab) => <ArrowSettingsGuide setTab={setTab} />}
      </Tab>
    </Tabs>
  );
};

export default GuideModal;
