import React from "react";
import SimpleBar from "simplebar-react";

interface SidebarProps {
  toggleState: boolean;
  children: React.ReactNode;
}

const Sidebar = ({ toggleState, ...props }: SidebarProps) => {
  return (
    <>
      <div
        className={`card-aside card-aside-right user-aside toggle-slide toggle-slide-right toggle-break-xxl ${
          toggleState && "content-active"
        }`}
        id="sidePanel_01"
      >
        <SimpleBar className="card-inner-group">{props.children}</SimpleBar>
      </div>
    </>
  );
};

export default Sidebar;
