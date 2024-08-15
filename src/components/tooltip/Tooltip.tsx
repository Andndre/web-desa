import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import type { Placement } from "@popperjs/core";
import Icon from "@/components/icon/Icon";

interface TooltipProps {
  iconClass?: string;
  icon?: string;
  id: string;
  direction?: Placement;
  text?: string;
  containerClassName?: string;
  tag?: "div" | "span" | "a";

  [key: string]: any;
}

const TooltipComponent = ({
  iconClass,
  icon,
  id,
  direction,
  text,
  containerClassName,
  ...props
}: TooltipProps) => {
  return (
    <React.Fragment>
      {props.tag ? (
        <props.tag className={containerClassName} id={id}>
          {" "}
          <Icon className={`${iconClass ? iconClass : ""}`} name={icon}></Icon>
        </props.tag>
      ) : (
        <Icon
          className={`${iconClass ? iconClass : ""}`}
          name={icon}
          id={id}
        ></Icon>
      )}
      <UncontrolledTooltip autohide={false} placement={direction} target={id}>
        {text}
      </UncontrolledTooltip>
    </React.Fragment>
  );
};

export default TooltipComponent;
