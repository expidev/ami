import style from "./Input.module.css"

const Input= ({
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
  
export default Input;