import { FC } from "react";
import { TabContentProps } from "../../../Common/Tabs/components/Tab";
import Button from "../../../Common/Button";

const DrawSettingsGuide: FC<TabContentProps> = ({ setTab }) => {
  return (
    <>
      <h1 className="text-2xl font-bold">Налаштування креслення</h1>
      <p className="mt-2">
        Після{" "}
        <a
          className="underline text-blue-700 dark:text-blue-400 hover:text-blue-500 cursor-pointer ease duration-200"
          onClick={() => setTab("draw-guide")}
        >
          створення креслення
        </a>{" "}
        ви можете налаштувати його відповідно до ваших потреб. Ви можете змінити
        колір та товщину лінії
      </p>
      <img
        src="/public/guide/draw-settings/example.png"
        className="mx-auto mt-4"
      />
      <p className="mt-2">
        Ви можете вибрати фігуру або лінію на карті, натиснувши на нього. Після
        цього замість панелі інструментів з'явиться панель налаштувань
        креслення, де ви можете змінити його властивості або дізнатися його тип
      </p>
      <div className="mt-4 flex gap-4">
        <Button
          className="w-full"
          onClick={() => setTab("start")}
          color="primaryLight"
        >
          До головної сторінки
        </Button>
        <Button className="w-full h-full" onClick={() => setTab("arrow-guide")}>
          Переглянути стрілки
        </Button>
      </div>
    </>
  );
};

export default DrawSettingsGuide;
