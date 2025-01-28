import { FC } from "react";
import { TabContentProps } from "../../../Common/Tabs/components/Tab";
import IconButton from "../../../Common/IconButton";
import { Draw } from "../../../Icons";
import Button from "../../../Common/Button";

const DrawGuide: FC<TabContentProps> = ({ setTab }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Креслення</h1>
      <p className="mt-2">
        Для створення фігур та ліній, вам потрібно вибрати інструмент{" "}
        <b>Креслення</b> у наборі інструментів, який виглядає так:
        <IconButton
          className="mx-auto mt-2"
          color="primaryLight"
          iconComponent={Draw}
        />
      </p>
      <p className="mt-2">
        Після вибору інструменту ви можете створити фігуру або лінію на карті,
        натиснувши та проводячи лінії. Після цих дій на місці креслення у вас
        з'явиться фігура або лінія
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
          onClick={() => setTab("draw-settings")}
          color="primary"
        >
          Переглянути налаштування креслення
        </Button>
      </div>
    </div>
  );
};

export default DrawGuide;
