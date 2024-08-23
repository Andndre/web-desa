import React from "react";
import classNames from "classnames";

interface ButtonProps {
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  outline?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button = ({
  color = "primary",
  size = "md",
  className = "",
  outline = false,
  disabled = false,
  ...props
}: ButtonProps) => {
  const buttonClass = classNames({
    btn: true,
    [`btn-${color}`]: !outline,
    [`btn-outline-${color}`]: outline,
    [`btn-${size}`]: size,
    disabled: disabled,
    [`${className}`]: className,
  });

  return (
    <button className={buttonClass} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
