import style from "./Textarea.module.css";

const Textarea = ({label, value, name, handleChange, errors, placeholder}) => (
    <textarea
            className={style.textarea}
            id={name}
            onChange={handleChange}
            name={name}
            placeholder={placeholder}
            value={value}
    />
);

export default Textarea;