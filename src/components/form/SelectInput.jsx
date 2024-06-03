import style from "./SelectInput.module.css";

const SelectInput = ({
  value,
  name,
  options,
  handleChange,
  placeholder,
  ...rest
}) => (
    <select
        className={style.selectInput}
        value={value}
        id={name}
        name={name}
        onChange={handleChange}
        {...rest}
    >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(option => (
        <option key={option.label} value={option.id}>
            {option.label}
        </option>
        ))}
    </select>
);

export default SelectInput;
