import style from './FileInput.module.css'

const FileInput = ({name, handleFileChange}) => (
    <>
        <input 
            className={style.input} 
            type="file" 
            onChange={handleFileChange}
            name={name}
        />
    </>
)

export default FileInput;