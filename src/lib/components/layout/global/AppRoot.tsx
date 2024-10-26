import React from "react";
import classNames from "classnames";

function AppRoot({
  className,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={"nk-app-root " + className}>{props.children}</div>;
}

export default AppRoot;
