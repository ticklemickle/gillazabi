"use client";

import { Listbox } from "@headlessui/react";
import { Fragment } from "react";

interface CustomSelectProps<T extends string> {
  label?: string;
  options: readonly T[]; // readonly 허용
  value: T;
  onChange: (value: T) => void;
}

export default function CustomSelect<T extends string>({
  label,
  options,
  value,
  onChange,
}: CustomSelectProps<T>) {
  return (
    <div className="w-full">
      {label && <label className="block mb-1 font-semibold">{label}</label>}
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full border border-gray-300 rounded-lg bg-white py-2 px-4 text-left cursor-pointer text-gray-800">
            {value || "선택"}
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 max-h-60 overflow-auto focus:outline-none">
            {options.map((option) => (
              <Listbox.Option key={option} value={option} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`cursor-pointer select-none px-4 py-2 rounded-md list-none
    ${active ? "bg-main-color text-white" : "text-gray-900"}
    ${selected ? "font-semibold text-main-color" : ""}`}
                  >
                    {option}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
