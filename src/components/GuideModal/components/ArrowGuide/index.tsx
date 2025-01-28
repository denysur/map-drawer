import { FC } from "react";
import { TabContentProps } from "../../../Common/Tabs/components/Tab";
import IconButton from "../../../Common/IconButton";
import Button from "../../../Common/Button";
import { Arrow } from "../../../Icons";

const ArrowGuide: FC<TabContentProps> = ({ setTab }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Стрілки</h1>
      <p className="mt-2">
        Для створення стрілки, вам потрібно вибрати інструмент <b>Стрілка</b> у
        наборі інструментів, який виглядає так:
        <IconButton
          className="mx-auto mt-2"
          color="primaryLight"
          iconComponent={Arrow}
        />
      </p>
      <p className="mt-2">
        Після вибору інструменту ви можете створити стрілку на карті, натиснувши
        та проводячи лінію. Після цих дій на кінці лінії у вас з'явиться стрілка
      </p>
      <div className="mt-4 flex gap-4">
        <Button
          className="w-full"
          onClick={() => setTab("start")}
          color="primaryLight"
        >
          До головної сторінки
        </Button>
        <Button
          className="w-full"
          onClick={() => setTab("arrow-settings")}
          color="primary"
        >
          Переглянути налаштування стрілки
        </Button>
      </div>
    </div>
  );
};

export default ArrowGuide;
