import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import clsx from "clsx";

export enum ButtonColorEnum {
  primary = "primary",
  primaryLight = "primaryLight",
  secondary = "secondary",
  error = "error",
}

export type ButtonColors = keyof typeof ButtonColorEnum;

export enum ButtonSizeEnum {
  small = "small",
  medium = "medium",
  large = "large",
}

export type ButtonSizes = keyof typeof ButtonSizeEnum;

export type ButtonProps = {
  color?: ButtonColors;
  size?: ButtonSizes;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  color = ButtonColorEnum.primary,
  size = ButtonSizeEnum.medium,
  children,
  className,
  ...rest
}) => (
  <button
    className={clsx(
      className,
      "font-medium rounded-lg focus:outline-none",
      color === ButtonColorEnum.secondary
        ? "text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        : color === ButtonColorEnum.error
          ? "text-white bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          : color === ButtonColorEnum.primaryLight
            ? "text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-400"
            : "text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      size === ButtonSizeEnum.small
        ? "text-xs px-3 py-1.5"
        : size === ButtonSizeEnum.large
          ? "text-lg px-6 py-3"
          : "text-sm px-5 py-2.5"
    )}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
