"use client";

import { cn } from "@/lib/utils";
import {
  InputHTMLAttributes,
  forwardRef,
  useState,
  useEffect,
  useRef,
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
  actionactive: boolean;
  actionfunction: () => void;
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
    actionactive,
    actiontitle,
    actionfunction,
    ...rest
  },
  ref
) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState<Data[]>([]);
  const wrapperRef = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    const handleClickOutside = async (event: MouseEvent) => {
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
  }, [wrapperRef]);

  return (
    <fieldset ref={wrapperRef} className={cn(`form-group`, className)}>
      <label htmlFor={name} className="form-label form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <div className="form-control-wrap">
        <input
          ref={ref}
          id={name}
          name={name}
          value={value}
          onInput={async (value) => {
            setValue(value.currentTarget.value);
            if (loading) return; // TODO: improve this handle
            setLoading(true);
            setData(await searchfunction(value.currentTarget.value));
            setLoading(false);
            setShowDropdown(true);
          }}
          {...rest}
          onFocus={() => setShowDropdown(true)}
          className="form-control"
        />
      </div>
      {error && <span className="text-sm text-danger">{error}</span>}
      {showDropdown && (
        <div className="absolute bg-white p-4 shadow border border-stroke top-19">
          {loading ? (
            "Loading"
          ) : (
            <>
              {data.length > 0 ? (
                data.map((d) => (
                  <Button
                    key={d.id}
                    type="button"
                    color=""
                    onClick={async () => {
                      setValue(d.id);
                      setvalue(d.id);
                      setShowDropdown(false);
                    }}
                    className="mt-1 w-100"
                    // className="w-full text-left rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
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

          <div className="pt-3"></div>
          <div className="border-t border-stroke"></div>
          {actionactive && (
            <div className="flex pt-3">
              <Button
                type="button"
                color="primary"
                onClick={() => actionfunction()}
              >
                {actiontitle}
              </Button>
            </div>
          )}
        </div>
      )}
    </fieldset>
  );
});
