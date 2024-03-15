import style from "./InputTexte.module.css"

const InputTexte= ({
  type, 
  value, 
  name, 
  label,
  placeholder,
  required,
  errors,
  handleChange
}) => (
        <div className={style.formGroup}>
          <label className={style.label} htmlFor={name}>
            {label}
          </label>
          <input
            className={style.input}
            type={type}
            value={value}
            id={name}
            name={name}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
          />
          {errors[name] && <span className={style.error}>*{errors[name]}</span>}
        </div>
);
  
export default InputTexte;