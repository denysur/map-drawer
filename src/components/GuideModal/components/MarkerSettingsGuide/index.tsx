import { FC } from "react";
import { TabContentProps } from "../../../Common/Tabs/components/Tab";
import Button from "../../../Common/Button";

const MarkerSettingsGuide: FC<TabContentProps> = ({ setTab }) => {
  return (
    <>
      <h1 className="text-2xl font-bold">Налаштування маркеру</h1>
      <p className="mt-2">
        Після{" "}
        <a
          className="underline text-blue-700 dark:text-blue-400 hover:text-blue-500 cursor-pointer ease duration-200"
          onClick={() => setTab("marker-guide")}
        >
          створення маркеру
        </a>{" "}
        ви можете налаштувати маркер відповідно до ваших потреб. Ви можете
        змінити іконку маркера, його колір, розмір та поворот.
      </p>
      <img
        src="/public/guide/marker-settings/example.png"
        className="mx-auto mt-4"
      />
      <p className="mt-2">
        Ви можете вибрати маркер на карті, натиснувши на нього. Після цього
        замість панелі інструментів з'явиться панель налаштувань маркера, де ви
        можете змінити його властивості
      </p>
      <p className="mt-2 flex items-center gap-2 text-red-700 dark:text-red-400">
        <b className="flex justify-center items-center text-3xl p-1 border-2 border-red-700 bg-red-300 dark:bg-red-900 dark:border-red-400 dark:text-red-400 rounded-full">
          !
        </b>{" "}
        Зверніть увагу, коли ви додаєте маркеру іконку, ви не можете вибрати
        колір маркера, але можете змінити його поворот
      </p>
      <img
        src="/public/guide/marker-settings/example-icon.png"
        className="mx-auto mt-4"
      />
      <div className="mt-4 flex gap-4">
        <Button
          className="w-full"
          onClick={() => setTab("start")}
          color="primaryLight"
        >
          До головної сторінки
        </Button>
        <Button className="w-full h-full" onClick={() => setTab("icons-guide")}>
          Переглянути іконки
        </Button>
      </div>
    </>
  );
};

export default MarkerSettingsGuide;
