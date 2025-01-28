import React, { FC } from "react";
import clsx from "clsx";

export enum MenuItemColorEnum {
  primary = "primary",
  secondary = "secondary",
  error = "error",
}

interface MenuItemProps {
  icon: FC<{ className?: string }>;
  label: string;
  onClick: () => void;
  color?: keyof typeof MenuItemColorEnum;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  onClick,
  color = MenuItemColorEnum.primary,
}) => {
  return (
    <button
      className={clsx(
        "flex items-center p-2 w-full text-left transition-colors duration-200 rounded-lg",
        color === MenuItemColorEnum.secondary
          ? "text-black dark:text-white hover:bg-green-200 dark:hover:bg-green-800"
          : color === MenuItemColorEnum.error
            ? "text-black dark:text-white hover:bg-red-200 dark:hover:bg-red-900"
            : "text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/10"
      )}
      onClick={onClick}
    >
      <span className="mr-2">
        <Icon />
      </span>
      <span>{label}</span>
    </button>
  );
};

export default MenuItem;
