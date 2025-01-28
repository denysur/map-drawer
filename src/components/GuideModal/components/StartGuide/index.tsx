import { FC } from "react";
import Button from "../../../Common/Button";
import { TabContentProps } from "../../../Common/Tabs/components/Tab";

const StartGuide: FC<TabContentProps> = ({ setTab }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Вітаємо у Map Drawer</h1>
      <p className="mt-2">
        У цьому довіднику ви можете дізнатися як користуватися цим сервісом
      </p>
      <p className="mt-2">
        Нижче ви можете побачити список доступних функцій та їх опис
      </p>
      <div className="mt-4 flex justify-center flex-wrap gap-4">
        <Button onClick={() => setTab("marker-guide")} color="primary">
          Маркер
        </Button>
        <Button onClick={() => setTab("marker-settings")} color="primary">
          Налаштування маркера
        </Button>
        <Button onClick={() => setTab("icons-guide")} color="primary">
          Іконки
        </Button>
        <Button onClick={() => setTab("draw-guide")} color="primary">
          Креслення
        </Button>
        <Button onClick={() => setTab("draw-settings")} color="primary">
          Налаштування креслення
        </Button>
        <Button onClick={() => setTab("arrow-guide")} color="primary">
          Стрілки
        </Button>
        <Button onClick={() => setTab("arrow-settings")} color="primary">
          Налаштування стрілок
        </Button>
      </div>
    </div>
  );
};

export default StartGuide;
