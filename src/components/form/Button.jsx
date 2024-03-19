import style from "./Button.module.css"

const Button = ({type, value, handleClick}) => (
    <>
        {type == "submit" && 
            <input
                type="submit" 
                className={style.submitButton}
                value={value}
            />
        }
        {type == "button" &&
            <button
                type="button"
                className={style.button}
                onClick={handleClick}
            >
                {value}
            </button>
        }
    </>
)

export default Button;