import { FC, useEffect, useRef, useState } from "react";

import {
  Arrow,
  Draw,
  Edit,
  MapMarker,
  Burger,
  Camera,
  Undo,
  Redo,
  DeleteAll,
} from "../Icons";

const SECTIONS = [
  { id: "marker", title: "Маркер" },
  { id: "icons", title: "Іконки" },
  { id: "draw", title: "Фігури" },
  { id: "arrow", title: "Стрілки" },
  { id: "screenshot", title: "Зберегти як картинку" },
  { id: "history", title: "Історія" },
];

const GuideImage = ({ src }: { src: string }) => (
  <img src={src} className="mt-4 mb-10 max-w-[500px]" />
);

const GuideModal: FC = () => {
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollPosition = containerRef.current.scrollTop;
      let currentSection = SECTIONS[0].id;

      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop - 100; // Adjust for header spacing
          if (scrollPosition >= offsetTop) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="flex h-full relative overflow-hidden">
      <div
        ref={containerRef}
        className="overflow-y-auto flex-grow px-10 py-16 pr-72"
      >
        <h2 className="text-3xl font-bold text-center mb-10">
          Інструкція з використання
        </h2>
        {SECTIONS.map(({ id, title }, index) => (
          <div key={index} id={id} className="mb-20">
            <h5 className="text-xl font-bold mb-6">{title}</h5>
            {id === "marker" && (
              <>
                <p className="mt-2">
                  Щоб створити маркер, виберіть інструмент <b>Маркер</b>
                  {" ("}
                  <MapMarker
                    className="inline text-blue-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "}у панелі інструментів.
                </p>
                <p className="mt-2">
                  Після активації інструмента натисніть на карту у потрібному
                  місці, щоб додати маркер.
                </p>
                <p className="mt-2">
                  Створений маркер можна налаштувати відповідно до ваших потреб:
                  змінити його колір, розмір, вибрати іншу іконку або видалити
                  його:
                </p>
                <GuideImage src="/public/guide/marker-settings.png" />
                <p className="mt-2">
                  Для того, щоб змінити іконку маркера, натисніть <b>Змінити</b>
                  {" ("}
                  <Edit
                    className="inline text-blue-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "}в налаштуваннях маркера. Вам буде запропоновано перелік
                  доступних іконок, або ви можете завнатажити нові. Виберіть
                  необхідну і натисніть <b>Вибрати</b>.
                </p>
                <GuideImage src="/public/guide/custom-marker-icon-select.png" />
                <p className="mt-6">
                  Налаштування маркера з кастомною іконкою:
                </p>
                <GuideImage src="/public/guide/marker-settings-with-icon.png" />
                <p className="mt-4 flex items-center gap-2 text-red-700 dark:text-red-400">
                  <b className="flex justify-center items-center text-3xl p-1 border-2 border-red-700 bg-red-300 dark:bg-red-900 dark:border-red-400 dark:text-red-400 rounded-full">
                    !
                  </b>{" "}
                  Зверніть увагу, коли ви додаєте маркеру іконку, ви не можете
                  вибрати колір маркера, але можете змінити його поворот
                </p>
                <p className="mt-6">
                  Після того як маркер був створений ви можете змінити його
                  положення. Для цього клікніть та проятгніть його в необхідне
                  положення.
                </p>
                <p className="mt-2">
                  Для того, щоб в подальшому змінити налаштування, просто
                  клікніть по необхідному маркеру.
                </p>
              </>
            )}
            {id === "icons" && (
              <>
                <p className="mt-2">
                  Цей інструмент дозволяє вам змінювати доступні іконки для
                  маркерів. Ви можете видаляти фбо додавати набір іконок для
                  маркерів. Для цього, перейдіть в <b>Налаштування</b>
                  {" ("}
                  <Burger
                    className="inline text-blue-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "} та натисніть на <b>Іконки</b>. Ви побачите інструмент
                  для роботи з іконками:
                </p>
                <GuideImage src="/public/guide/icons-change-modal.png" />
                <p className="mt-2">
                  Щоб завантажити іконку, натисніть <b>Завантажити</b>.
                </p>
                <p className="mt-2">
                  Щоб видалити іконку, натисніть на необхідну, після цього
                  натисніть <b>Видалити файл</b>.
                </p>
              </>
            )}
            {id === "draw" && (
              <>
                <p className="mt-2">
                  Для створення фігур та ліній, вам потрібно вибрати інструмент{" "}
                  <b>Фігури</b>
                  {" ("}
                  <Draw
                    className="inline text-blue-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "}на панелі інструментів. Натисніть та протягніть по
                  карті, намалювавши фігуру, подібну до тої яку хочете отримати:
                </p>
                <GuideImage src="/public/guide/draw-example.png" />
                <p className="mt-2">
                  Відпустіть по завершенню і інструмент буде намагатися
                  автоматично намалювати необхідру фігуру:
                </p>
                <GuideImage src="/public/guide/draw-example-adjusted.png" />
                <p className="mt-2">
                  Після створення фігури ви можете змінити колір, товщину лінії,
                  або видалити її.
                </p>
                <GuideImage src="/public/guide/draw-settings.png" />
              </>
            )}
            {id === "arrow" && (
              <>
                <p className="mt-2">
                  Для створення стрілки виберіть інструмент <b>Стрілка</b>
                  {" ("}
                  <Arrow
                    className="inline text-blue-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "} на панелі інструментів. Натисніть та протягніть по
                  карті, намалювавши лінію, напрям та крайні точкий якої будуть
                  базою для створення стрілки. Відпустіть і інстумент
                  автоматично перетворить лінію на стрілку:
                </p>
                <GuideImage src="/public/guide/arrow-example.png" />
                <p className="mt-2">
                  Після створення стрілки ви можете змінити колір, товщину
                  лінії, розмір накінечника, або видалити її.
                </p>
                <GuideImage src="/public/guide/arrow-settings.png" />
              </>
            )}
            {id === "screenshot" && (
              <>
                <p className="mt-2">
                  Для збереження стану в картинку натисніть <b>Камеру</b>
                  {" ("}
                  <Camera
                    className="inline text-blue-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "} на панелі інструментів. Натиснувши на неї вам буде
                  запропоновано скачати картинку (в <b>.png</b> форматі), на
                  якії будуть зображені всі елементи створені на карті.
                </p>
              </>
            )}
            {id === "history" && (
              <>
                <p className="mt-2">
                  Для навігації по історії існує 3 кнопки на панелі
                  інструментів: <b>Назад</b>
                  {" ("}
                  <Undo
                    className="inline text-orange-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "}, <b>Вперед</b>
                  {" ("}
                  <Redo
                    className="inline text-orange-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "} та <b>Очистити</b>
                  {" ("}
                  <DeleteAll
                    className="inline text-red-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "}
                </p>
                <p className="mt-2">
                  {" ("}
                  <Undo
                    className="inline text-orange-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "} - дозволяє відміняти останні дії.
                </p>
                <p className="mt-2">
                  {" ("}
                  <Redo
                    className="inline text-orange-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "} - дозволяє повернути скасовану зміну. Доступний тільки
                  якщо відмінялась якісь дії кнопкою <b>Назад</b>.
                </p>
                <p className="mt-2">
                  {" ("}
                  <DeleteAll
                    className="inline text-red-700 mb-1"
                    width={20}
                    height={20}
                  />
                  {") "} - Видаляє всю історію та чистить всі елементи на мапі.
                </p>
                <p className="mt-4 flex items-center gap-2 text-red-700 dark:text-red-400">
                  <b className="flex justify-center items-center text-3xl p-1 border-2 border-red-700 bg-red-300 dark:bg-red-900 dark:border-red-400 dark:text-red-400 rounded-full">
                    !
                  </b>{" "}
                  Зверніть увагу, якщо перейти назад декілька разів, а потім
                  зробити якусь дію (додати якийсь елемент) - наступна історія
                  перепишеться новим елементом і навігація вперед буде
                  недоступною.
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      <nav className="w-72 border-l border-gray-300 dark:border-gray-600 px-4 py-16 absolute right-0 top-0 h-full">
        <ul className="space-y-3">
          {SECTIONS.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeSection === id
                    ? "text-gray-900"
                    : "text-gray-400 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-400"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default GuideModal;
