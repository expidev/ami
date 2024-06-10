import Error from "./form/Error";
import FileInput from "./form/FileInput";
import Label from "./form/Label"
import SimpleButton from "./form/SimpleButton";
import GroupInput from "./GroupInput";
import style from "./AjoutFichier.module.css";


const AjoutFichier = ({formValues, files, errors, setFormValues}) => {
    /*** Permet d'ajouter des multiples de fichier ***/

    const handleFileChange = (e) => {

        const newFiles = files.map(file => {
            if (file.name === e.target.name) 
                return {name: file.name, fichier: e.target.files[0]}
            else
                return file;
        })

        setFormValues({
            ...formValues,
            files: newFiles
        });
    }

    const handleRemoveFile = (fileName) => {
        const newFiles = files.filter(
            file => file.name != fileName
        )
    
        setFormValues({
            ...formValues,
            files: newFiles
        });
    }

    const handleAddFile = () => {
        setFormValues({
            ...formValues,
            files: [...files, {
                    name: `fichier${new Date().toString()}`,
                    fichier: null
                }
            ]
        });
    }

    return (
        <GroupInput>
            <Label value="Dossier DAO" name="fichier" />
            {
                files.map((file) => (
                    <div key={file.name} >
                    <div 
                        className={style.fileContainer}
                    >
                        <FileInput
                            name={file.name}
                            handleFileChange={handleFileChange}
                            accept="image/*,.pdf,.docx,.ppt,.xlsx"
                        />
                        <SimpleButton
                            value="X"
                            handleClick={(e) => handleRemoveFile(file.name)}
                        />
                    </div>
                    <Error value={errors[files[file.name]]} />
                    </div>
                ))
            }
            <SimpleButton
                value="Ajouter une autre fichier"
                handleClick={handleAddFile}
            />
        </GroupInput>
    )
}

export default AjoutFichier;