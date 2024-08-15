"use client";

import React, { useState } from "react";

interface InputSwitchProps {
  label: string;
  id: string;
  checked: boolean;
}

const InputSwitch = ({ label, id, checked }: InputSwitchProps) => {
  const [inputCheck, setCheck] = useState(checked ? true : false);

  return (
    <React.Fragment>
      <input
        type="checkbox"
        className="custom-control-input"
        defaultChecked={inputCheck}
        onClick={() => setCheck(!inputCheck)}
        id={id}
      />
      <label className="custom-control-label" htmlFor={id}>
        {label}
      </label>
    </React.Fragment>
  );
};

export default InputSwitch;
