"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label: string;
  options: {
    nama: string;
    id: number | string;
  }[];
}

export const Select = forwardRef<HTMLSelectElement, Props>(function Select(
  { name, error, label, required, className, options, ...rest },
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
      <select
        ref={ref}
        id={name}
        name={name}
        {...rest}
        className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
      >
        <option key="" value="">
          Choose an option...
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nama}
          </option>
        ))}
      </select>
      {error && <span className="text-sm text-danger">{error}</span>}
    </fieldset>
  );
});
