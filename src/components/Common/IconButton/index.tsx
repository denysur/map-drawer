import { FC } from "react";

import Button, { ButtonProps } from "../Button";

type IconButtonProps = {
  iconComponent: FC<{ className?: string }>;
} & Omit<ButtonProps, "children">;

const IconButton: FC<IconButtonProps> = ({
  iconComponent: Icon,
  ...buttonProps
}) => {
  const iconSize =
    buttonProps.size === "small"
      ? "w-4 h-4"
      : buttonProps.size === "large"
        ? "w-10 h-10"
        : "w-7 h-7";

  return (
    <Button {...buttonProps}>
      <Icon className={iconSize} />
    </Button>
  );
};

export default IconButton;
