"use client";

import {
  SelectHTMLAttributes,
  forwardRef,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
} from "react";
import { Button } from "reactstrap";
import { cn } from "@/lib/utils";

interface Option {
  nama: string;
  id: number | string;
}

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label: string;
  options: Option[];
  setvalue: (value: string) => void;
}

export const SelectType = forwardRef<HTMLSelectElement, Props>(
  function SelectType(
    { name, error, label, required, className, options, setvalue, ...rest },
    ref
  ) {
    const [value, setValue] = useState("");
    const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
    const [showDropdown, setShowDropdown] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLFieldSetElement>(null);

    // Handle clicks outside the dropdown to close it
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setShowDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Filter options based on input
    const handleInputChange = (inputValue: string) => {
      setValue(inputValue);
      const filtered = options.filter((option) =>
        option.nama.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowDropdown(true);
      setHighlightedIndex(0); // Reset highlighted index when options change
    };

    // Handle selection of an option
    const handleOptionSelect = (selectedId: string | number) => {
      const selectedOption = options.find((option) => option.id === selectedId);
      if (selectedOption) {
        setValue(selectedOption.nama);
        setvalue(selectedOption.id.toString());
        setShowDropdown(false);
        inputRef.current?.blur(); // Remove focus from input to close dropdown
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (!showDropdown || filteredOptions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prevIndex) =>
            prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : filteredOptions.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          const selectedOption = filteredOptions[highlightedIndex];
          if (selectedOption) {
            handleOptionSelect(selectedOption.id);
          }
          break;
        case "Escape":
          setShowDropdown(false);
          break;
        default:
          break;
      }
    };

    return (
      <fieldset
        ref={wrapperRef}
        className={cn(`form-group position-relative`, className)}
      >
        <label htmlFor={`${name}-input`} className="form-label">
          {label}
          {required && <span className="text-danger">*</span>}
        </label>
        <div className="form-control-wrap">
          <input
            ref={inputRef}
            id={`${name}-input`}
            name={`${name}-input`}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => setShowDropdown(true)}
            onKeyDown={handleKeyDown}
            className="form-control"
            autoComplete="off"
          />
          {showDropdown && (
            <div
              className="position-absolute bg-white shadow border rounded mt-1 w-100"
              style={{ zIndex: 1050 }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <Button
                    key={option.id}
                    type="button"
                    color="light"
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-100 text-left ${
                      index === highlightedIndex ? "bg-primary text-white" : ""
                    }`}
                  >
                    {option.nama}
                  </Button>
                ))
              ) : (
                <div className="p-2 text-muted">
                  {value.length === 0
                    ? "Ketik untuk mencari"
                    : "Data tidak ditemukan"}
                </div>
              )}
            </div>
          )}
          {/* Select element that remains hidden but maintains the selected value */}
          <select
            ref={ref}
            id={name}
            name={name}
            className="d-none"
            {...rest}
            value={options.find((opt) => opt.nama === value)?.id || ""}
            onChange={(e) => handleOptionSelect(e.target.value)}
          >
            <option value="">Pilih...</option>
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
  }
);
