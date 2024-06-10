import style from "./SubmitButton.module.css"

const SubmitButton = ({value}) => (
    <>
        <input
            type="submit" 
            className={style.submitButton}
            value={value}
        />
    </>
)

export default SubmitButton;