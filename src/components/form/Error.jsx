import style from "./Error.module.css"

const Error = ({value}) => (
    <>
        {value && 
            <span className={style.error}>
                *{value}
            </span>
        }
    </>
)

export default Error;