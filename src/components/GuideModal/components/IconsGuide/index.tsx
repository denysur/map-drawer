import { FC } from "react";
import { TabContentProps } from "../../../Common/Tabs/components/Tab";
import Button from "../../../Common/Button";

const IconsGuide: FC<TabContentProps> = ({ setTab }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Іконки</h1>
      <p className="mt-2">
        Ви можете видаляти та добавляти набір іконок для маркерів. Для цього,
        перейдіть в налаштування (кнопка знаходиться зліва сверху) та натисніть
        на <b>Іконки</b>
      </p>
      <img src="/public/guide/icons-guide/modal.png" className="mx-auto mt-4" />
      <p className="mt-2">
        Після цього ви побачите вікно з налаштуваннями іконок, де ви можете
        завантажити або видалити іконки. Щоб видалити іконку, натисніть на неї
        та натисніть кнопку видалення. Щоб додати іконку, натисніть кнопку
        завантаження та виберіть файл з іконкою у своєму сховищі.
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
          onClick={() => setTab("draw-guide")}
          color="primary"
        >
          Переглянути креслення
        </Button>
      </div>
    </div>
  );
};

export default IconsGuide;
