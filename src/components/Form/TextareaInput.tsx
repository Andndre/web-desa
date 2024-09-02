"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label: string;
}

export const TextareaInput = forwardRef<HTMLTextAreaElement, Props>(
  function TextareaInput(
    { name, error, label, required, className, ...rest },
    ref
  ) {
    return (
      <fieldset className={`form-group ${className ? className : ""}`}>
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <div className="form-control-wrap">
          <textarea
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
  }
);
