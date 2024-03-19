import style from "./InputContainer.module.css"

const InputContainer = ({children}) => (
    <div className={style.inputContainer}>
        {children}
    </div>
)

export default InputContainer;