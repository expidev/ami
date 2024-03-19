import style from "./InputTexte.module.css"

const InputTexte= ({
  type, 
  value, 
  name, 
  placeholder,
  handleChange
}) => (
       <input
         className={style.input}
         type={type}
         value={value}
         id={name}
         name={name}
         onChange={handleChange}
         placeholder={placeholder}
       />
);
  
export default InputTexte;