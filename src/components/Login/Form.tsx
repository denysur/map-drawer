import { FC } from "react";
import clsx from "clsx";

import Button from "../Common/Button";

type FormProps = {
  invalidFields: string[];
  errorMessage: string | undefined;
  onSubmit: (formData: FormData) => void;
};

const Form: FC<FormProps> = ({ invalidFields, errorMessage, onSubmit }) => (
  <form action={onSubmit}>
    <div className="flex flex-col gap-8 items-center">
      <div className="flex flex-col gap-2">
        <div>
          <label
            htmlFor="email"
            className={clsx(
              "text-black dark:text-white  text-sm",
              invalidFields.includes("email") && "text-red-500"
            )}
          >
            Пошта
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Введіть пошту"
            className={clsx(
              "block appearance-none p-2 border-2 border-gray-500 rounded-lg text-base text-black placeholder:text-gray-400 focus:outline-none focus:ring-blue-700/50 focus:ring-4 focus:border-blue-500 ease duration-200 dark:bg-zinc-800 dark:border-zinc-700 dark:placeholder:text-zinc-500 dark:text-white",
              invalidFields.includes("email") && "border-red-500"
            )}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className={clsx(
              "text-black dark:text-white text-sm",
              invalidFields.includes("password") && "text-red-500"
            )}
          >
            Пароль
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Введіть пароль"
            className={clsx(
              "block appearance-none p-2 border-2 border-gray-500 rounded-lg text-base text-black placeholder:text-gray-400 focus:outline-none focus:ring-blue-700/50 focus:ring-4 focus:border-blue-500 ease duration-200 dark:bg-zinc-800 dark:border-zinc-700 dark:placeholder:text-zinc-500 dark:text-white",
              invalidFields.includes("password") && "border-red-500"
            )}
          />
        </div>

        {errorMessage && (
          <span className="text-xs text-red-500 w-full">{errorMessage}</span>
        )}
      </div>
      <Button type="submit" className="w-full">
        Увійти
      </Button>
    </div>
  </form>
);

export default Form;
