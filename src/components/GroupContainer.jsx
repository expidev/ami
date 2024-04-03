import style from "./GroupContainer.module.css"

const GroupContainer = ({children}) => (
    <div className={style.GroupContainer}>
        {children}
    </div>
)

export default GroupContainer;