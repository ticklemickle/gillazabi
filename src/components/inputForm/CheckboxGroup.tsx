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
    <div className="flex flex-wrap gap-2">
      {options.map((v) => (
        <label
          key={v}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl cursor-pointer
                     hover:border-main-color hover:text-main-color hover:font-semibold hover:bg-main-light-shadow"
        >
          <input
            type="checkbox"
            name={name}
            value={v}
            checked={value.includes(v)}
            onChange={(e) => onChange(name, v, e.target.checked)}
            className="accent-main-color"
          />

          <span>{v}</span>
        </label>
      ))}
    </div>
  </div>
);
