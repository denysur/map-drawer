import Button from "../../../Common/Button";

const ArrowSettingsGuide = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Налаштування стрілок</h1>
      <p className="mt-2">
        Після створення стрілки ви можете налаштувати його відповідно до ваших
        потреб. Ви можете змінити колір, товщину лінії та розмір стрілки
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
    </>
  );
};

export default ArrowSettingsGuide;
