import style from "./Label.module.css"

const Label = ({value, required, name}) => (
    <>
        <label 
            className={`${style.label} ${required && style.required}`} 
            htmlFor={name}
        >
            {value}
        </label>
    </>
)

export default Label;