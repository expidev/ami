import style from "./InputTexte.module.css"

const InputTexte= ({
  type, 
  value, 
  name, 
  placeholder,
  handleChange,
  ...rest
}) => (
       <input
         className={style.input}
         type={type}
         value={value}
         id={name}
         name={name}
         onChange={handleChange}
         placeholder={placeholder}
         {...rest}
       />
);
  
export default InputTexte;