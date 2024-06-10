import style from "./GroupInput.module.css"

const GroupInput = ({children}) => (
    <div className={style.GroupContainer}>
        {children}
    </div>
)

export default GroupInput;