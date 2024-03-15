import style from "./InputTexte.module.css"

const InputTexte= ({type, value, name, label, handleChange}) => (
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
          />
        </div>
);
  
export default InputTexte;