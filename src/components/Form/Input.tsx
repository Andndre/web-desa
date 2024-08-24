"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input(
  { name, error, label, required, className, ...rest },
  ref
) {
  return (
    <fieldset className={`form-group ${className ? className : ""}`}>
      <label htmlFor={name} className="form-label form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className="form-control-wrap">
        <input
          ref={ref}
          id={name}
          name={name}
          {...rest}
          className="form-control"
        />
      </div>
      {error && <span className="text-sm text-danger">{error}</span>}
    </fieldset>
  );
});
