import React from "react";
import classNames from "classnames";

function AppRoot({
  className,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const compClass = classNames({
    "nk-app-root": true,
    [`${className}`]: className,
  });
  return <div className={compClass}>{props.children}</div>;
}

export default AppRoot;
