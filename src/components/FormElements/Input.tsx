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
    <fieldset className={`flex flex-col ${className ? className : ""}`}>
      <label
        htmlFor={name}
        className="mb-3 block text-sm font-medium text-black dark:text-white"
      >
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <input
        ref={ref}
        id={name}
        name={name}
        {...rest}
        className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
      />
      {error && <span className="text-sm text-danger">{error}</span>}
    </fieldset>
  );
});
