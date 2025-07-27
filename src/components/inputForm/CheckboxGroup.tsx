import React from "react";

type Props = {
  name: string;
  options: string[];
  label?: string;
  value: string[];
  onChange: (name: string, value: string, checked: boolean) => void;
};

export const renderCheckboxGroup = ({
  name,
  options,
  label,
  value,
  onChange,
}: Props) => (
  <div className="space-y-1">
    {label && (
      <label className="block font-semibold text-[#000] mb-1">{label}</label>
    )}
    <div className="flex flex-wrap gap-3 ">
      {options.map((v) => {
        const isChecked = value.includes(v);
        return (
          <button
            key={v}
            type="button"
            onClick={() => onChange(name, v, !isChecked)}
            className={`px-4 py-2 text-sm font-medium rounded-xl transition
          ${
            isChecked
              ? "bg-main-light-shadow text-main-color font-semibold border border-main-color"
              : "bg-gray-100 text-gray-800 border border-transparent"
          }
          hover:border-main-color hover:text-main-color hover:font-semibold hover:bg-main-light-shadow
          active:scale-95 active:shadow-inner
        `}
          >
            {v}
          </button>
        );
      })}
    </div>
  </div>
);
