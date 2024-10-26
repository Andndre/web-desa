"use client";

import {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from "react";
import { Button } from "reactstrap";

type Data = {
  id: string;
  nama: string;
};

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
  searchfunction: (value: string) => Promise<Data[]>;
  actiontitle: string;
  setvalue: (value: string) => void;
}

export const SelectSearch = forwardRef<HTMLInputElement, Props>(function Input(
  {
    name,
    error,
    label,
    required,
    className,
    setvalue,
    searchfunction,
    actiontitle,
    ...rest
  },
  ref
) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const wrapperRef = useRef<HTMLFieldSetElement>(null);

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

  const handleInputChange = async (inputValue: string) => {
    setValue(inputValue);
    if (loading) return;
    setLoading(true);
    const results = await searchfunction(inputValue);
    setData(results);
    setLoading(false);
    setShowDropdown(true);
    setHighlightedIndex(0); // Reset highlighted index when options change
  };

  const handleOptionSelect = (selectedId: string) => {
    const selectedOption = data.find((option) => option.id === selectedId);
    if (selectedOption) {
      setValue(selectedOption.id);
      setvalue(selectedOption.id);
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || data.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < data.length - 1 ? prevIndex + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : data.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        const selectedOption = data[highlightedIndex];
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
    <fieldset ref={wrapperRef} className={`form-group ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className="form-control-wrap">
        <input
          ref={ref}
          id={name}
          name={name}
          value={value}
          onInput={(e) => handleInputChange(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          {...rest}
          className="form-control"
          autoComplete="off"
        />
      </div>
      {error && <span className="text-sm text-danger">{error}</span>}
      {showDropdown && (
        <div className="absolute bg-white p-4 shadow border border-stroke top-19 w-100">
          {loading ? (
            "Loading"
          ) : (
            <>
              {data.length > 0 ? (
                data.map((d, index) => (
                  <Button
                    key={d.id}
                    type="button"
                    color=""
                    onClick={() => handleOptionSelect(d.id)}
                    className={`mt-1 w-100 text-left ${
                      index === highlightedIndex ? "bg-primary text-white" : ""
                    }`}
                  >
                    {d.id} ({d.nama})
                  </Button>
                ))
              ) : (
                <span>
                  {value.length === 0
                    ? "Ketik untuk mencari"
                    : "Data tidak ditemukan"}
                </span>
              )}
            </>
          )}
        </div>
      )}
    </fieldset>
  );
});
