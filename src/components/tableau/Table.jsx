import style from "./Table.module.css"

const Table = ({headers, children}) => (
    <table className={style.table}>
        <tbody>
            <tr>
                {headers[0] && headers.map((header, index) => (
                    <th key={index}>
                        {header}
                    </th>
                ))}
            </tr>
            {children}
        </tbody>
    </table>
)

export default Table;