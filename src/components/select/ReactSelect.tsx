import React, { forwardRef } from "react";
import Select, {
  GroupBase,
  OptionsOrGroups,
  SelectInstance,
} from "react-select";

interface RSelectProps<T> {
  className?: string;
  options?: OptionsOrGroups<T, GroupBase<T>>;
  name?: string;
}

const RSelect = forwardRef<SelectInstance<unknown>, RSelectProps<unknown>>(
  (props, ref) => {
    return (
      <Select
        ref={ref}
        className={`react-select-container ${
          props.className ? props.className : ""
        }`}
        classNamePrefix="react-select"
        {...props}
      />
    );
  }
);

export default RSelect;
