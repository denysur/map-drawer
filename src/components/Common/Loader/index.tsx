import clsx from "clsx";
import { FC } from "react";

export enum LoaderSizeEnum {
  small = "small",
  medium = "medium",
  large = "large",
}

export type LoaderSizes = keyof typeof LoaderSizeEnum;

export type LoaderProps = {
  className?: string;
  size?: LoaderSizes;
};

const Loader: FC<LoaderProps> = ({ className, size = 6 }) => {
  return (
    <svg
      className={clsx(
        className,
        `animate-spin`,
        size === LoaderSizeEnum.small
          ? "w-6 h-6"
          : size === LoaderSizeEnum.large
            ? "w-10 h-10"
            : "w-8 h-8"
      )}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
};

export default Loader;
