import React from "react";
import classNames from "classnames";

function AppMain({
  className,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const compClass = classNames({
    "nk-main": true,
    [`${className}`]: className,
  });
  return <div className={compClass}>{props.children}</div>;
}

export default AppMain;
