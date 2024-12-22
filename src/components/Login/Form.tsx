import { FC } from "react";
import clsx from "clsx";

type FormProps = {
  invalidFields: string[];
  errorMessage: string | undefined;
  onSubmit: (formData: FormData) => void;
};

const Form: FC<FormProps> = ({ invalidFields, errorMessage, onSubmit }) => (
  <form action={onSubmit}>
    <div className="flex flex-col gap-2 items-center">
      <div>
        <label
          htmlFor="email"
          className={clsx(
            "text-gray-500 text-sm",
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
            "block appearance-none p-2 border-2 border-gray-500 rounded-md text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus::bg-blue-800",
            invalidFields.includes("email") && "border-red-500"
          )}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className={clsx(
            "text-gray-500 text-sm",
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
            "block appearance-none p-2 border-2 border-gray-500 rounded-md text-base text-gray-500 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus::bg-blue-800",
            invalidFields.includes("password") && "border-red-500"
          )}
        />
      </div>
      {errorMessage && (
        <span className="text-xs text-red-500 w-full">{errorMessage}</span>
      )}
      <button
        type="submit"
        className="text-white bg-blue-700 mt-4 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Увійти
      </button>
    </div>
  </form>
);

export default Form;
