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
    <fieldset className={`form-group ${className ? className : ""}`}>
      <label htmlFor={name} className="form-label form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className="form-control-wrap">
        <select
          ref={ref}
          id={name}
          name={name}
          {...rest}
          className="form-control"
        >
          <option key="" value="">
            Pilih...
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.nama}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="text-sm text-danger">{error}</span>}
    </fieldset>
  );
});
