export const RadioGroup = ({
  name,
  options,
  label,
  onChange,
  value,
}: {
  name: string;
  options: string[];
  label?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}) => (
  <div className="space-y-1">
    {label && <label className="block font-semibold mb-1">{label}</label>}
    <div className="flex gap-3">
      {options.map((v) => (
        <label className="flex-1 block" key={v}>
          <input
            type="radio"
            name={name}
            value={v}
            className="sr-only peer"
            onChange={onChange}
            checked={value === v}
          />
          <div
            className="py-3 rounded-xl text-center cursor-pointer text-[#000]
    border border-transparent bg-gray-100
    transition duration-150 transform
    hover:border-main-color hover:text-main-color hover:font-semibold hover:bg-main-light-shadow
    active:scale-95 active:shadow-inner
    peer-checked:border-main-color peer-checked:text-main-color peer-checked:font-semibold peer-checked:bg-main-light-shadow"
          >
            {v}
          </div>
        </label>
      ))}
    </div>
  </div>
);
