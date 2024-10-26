import React from "react";
import classNames from "classnames";
import Icon from "../icon/Icon";
import Image from "next/image";

// Define available sizes and themes as TypeScript types
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Theme =
  | "blue-dim"
  | "blue"
  | "azure-dim"
  | "azure"
  | "indigo-dim"
  | "indigo"
  | "purple-dim"
  | "purple"
  | "pink-dim"
  | "pink"
  | "orange-dim"
  | "orange"
  | "teal-dim"
  | "teal"
  | "primary-dim"
  | "primary"
  | "secondary-dim"
  | "secondary"
  | "success-dim"
  | "success"
  | "info-dim"
  | "info"
  | "warning-dim"
  | "warning"
  | "danger-dim"
  | "danger"
  | "dark-dim"
  | "dark"
  | "gray-dim"
  | "gray"
  | "lighter"
  | "light";

interface UserAvatarProps {
  className?: string;
  size?: Size;
  theme?: Theme;
  icon?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  className,
  size,
  theme,
  icon,
  text,
  image,
  imageAlt,
  ...props
}) => {
  const classes = classNames({
    "user-avatar": true,
    [className || ""]: className,
    [`user-avatar-${size}`]: size,
    [`bg-${theme}`]: theme,
  });

  return (
    <div className={classes} {...props}>
      {icon && <Icon name={icon} />}
      {image && <Image src={image} alt={imageAlt || ""} />}
      {text && !image && <span>{text}</span>}
      {props.children}
    </div>
  );
};

export default UserAvatar;
