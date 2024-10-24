import React from "react";

function AppContent({
  className,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={"nk-content " + className}>{props.children}</div>;
}

export default AppContent;
