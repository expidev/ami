import style from "./SimpleButton.module.css"

const SimpleButton = ({value, handleClick, disabled}) => (
    <button
        type="button"
        className={style.button}
        onClick={handleClick}
        disabled={disabled}
    >
        {value}
    </button>
)

export default SimpleButton;