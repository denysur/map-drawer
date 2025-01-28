import { FC } from "react";
import { TabContentProps } from "../../../Common/Tabs/components/Tab";
import Button from "../../../Common/Button";

const ArrowSettingsGuide: FC<TabContentProps> = ({ setTab }) => {
  return (
    <>
      <h1 className="text-2xl font-bold">Налаштування стрілок</h1>
      <p className="mt-2">
        Після{" "}
        <a
          className="underline text-blue-700 dark:text-blue-400 hover:text-blue-500 cursor-pointer ease duration-200"
          onClick={() => setTab("arrow-guide")}
        >
          створення стрілки
        </a>{" "}
        ви можете налаштувати його відповідно до ваших потреб. Ви можете змінити
        колір, товщину лінії та розмір стрілки
      </p>
      <img
        src="/public/guide/arrow-settings/example.png"
        className="mx-auto mt-4"
      />
      <p className="mt-2">
        Ви можете вибрати стрілку на карті, натиснувши на нього. Після цього
        замість панелі інструментів з'явиться панель налаштувань креслення, де
        ви можете змінити його властивості
      </p>
      <div className="mt-4 flex gap-4">
        <Button className="w-full" onClick={() => setTab("start")}>
          До головної сторінки
        </Button>
      </div>
    </>
  );
};

export default ArrowSettingsGuide;
