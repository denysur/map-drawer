import { FC } from "react";
import { TabContentProps } from "../../../Common/Tabs/components/Tab";
import IconButton from "../../../Common/IconButton";
import { MapMarker } from "../../../Icons";
import Button from "../../../Common/Button";

const MarkerGuide: FC<TabContentProps> = ({ setTab }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Маркер</h1>
      <p className="mt-2">
        Для створення маркеру вам потрібно вибрати інструмент <b>Маркер</b> у
        наборі інструментів, який виглядає так:
        <IconButton
          className="mx-auto mt-2"
          color="primaryLight"
          iconComponent={MapMarker}
        />
      </p>
      <p className="mt-2">
        Після вибору інструменту ви можете створити маркер на карті, натиснувши
        на потрібне місце, і на цьому місці у вас з'явиться маркер
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
          onClick={() => setTab("marker-settings")}
          color="primary"
        >
          Переглянути налаштування маркера
        </Button>
      </div>
    </div>
  );
};

export default MarkerGuide;
