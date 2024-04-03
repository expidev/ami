import style from './FileInput.module.css'

const FileInput = ({name, accept, handleFileChange}) => (
    <>
        <input 
            className={style.input} 
            type="file"
            accept={accept}
            onChange={handleFileChange}
            name={name}
        />
    </>
)

export default FileInput;