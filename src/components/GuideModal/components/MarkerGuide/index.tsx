import IconButton from "../../../Common/IconButton";
import { MapMarker } from "../../../Icons";

const MarkerGuide = () => {
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
    </div>
  );
};

export default MarkerGuide;
