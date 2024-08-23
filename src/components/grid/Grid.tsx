import React from "react";
import classnames from "classnames";

interface ColProps {
  sm?: number;
  lg?: number;
  md?: number;
  xxl?: number;
  size?: number;
  className?: string;
  children: React.ReactNode;
}

export const Col = ({ sm, lg, md, xxl, size, className, ...props }: ColProps) => {
  var classNames = classnames({
    [`col-sm-${sm}`]: sm,
    [`col-lg-${lg}`]: lg,
    [`col-md-${md}`]: md,
    [`col-xxl-${xxl}`]: xxl,
    [`col-${size}`]: size,
    [`${className}`]: className,
  });
  return <div className={classNames}>{props.children}</div>;
};

interface RowProps {
  className?: string;
  children: React.ReactNode;
}

export const Row = ({ className, ...props }: RowProps) => {
  const rowClass = classnames({
    row: true,
    [`${className}`]: className,
  });
  return <div className={rowClass}>{props.children}</div>;
};
