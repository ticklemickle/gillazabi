import CustomSelect from "./CustomSelection";

type SelectFieldConfig = {
  label: string;
  options: readonly string[];
};

export const renderCustomSelect = (
  name: string,
  config: SelectFieldConfig,
  value: string,
  onChange: (name: string, value: string) => void
) => (
  <CustomSelect
    label={config.label}
    options={config.options}
    value={value}
    onChange={(val) => onChange(name, val)}
  />
);
