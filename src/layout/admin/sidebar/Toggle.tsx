import React from "react";
import Icon from "@/components/icon/Icon";

interface ToggleProps {
  className?: string;
  click: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  icon: string;
}

const Toggle: React.FC<ToggleProps> = ({ className, click, icon }) => {
  return (
    <Link
      href="#toggle"
      className={className ? className : ""}
      onClick={(ev) => {
        ev.preventDefault();
        click(ev);
      }}
    >
      <Icon name={icon} />
    </Link>
  );
};

export default Toggle;
