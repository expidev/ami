import style from "./InputTexte.module.css"

const InputTexte= ({type, value, name, label, handleChange}) => (
        <div className={style.formGroup}>
          <label className={style.label} id={name}>
            {label}
          </label>
          <input
            className={style.input}
            type={type}
            value={value}
            name={name}
            onChange={handleChange}
          />
        </div>
);
  
export default InputTexte;