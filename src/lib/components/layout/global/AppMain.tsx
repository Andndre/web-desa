import React from "react";

function AppMain({
  className,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={"nk-main " + className}>{props.children}</div>;
}

export default AppMain;
