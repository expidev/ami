import { useState } from "react";
import InputTexte from "../components/form/InputTexte";

import style from "./AjoutDossier.module.css";
import Title from "../components/Title";
import { validateDepotDossier } from "../helpers/validateForm";
import Textarea from "../components/form/Textarea";
import Button from "../components/form/Button";
import Label from "../components/form/Label";
import InputContainer from "../components/form/InputContainer";
import Error from "../components/form/Error";
import DocumentApi from "../api/DocumentApi";
import FileInput from "../components/form/FileInput";

const AjoutDossier= () => {

  const [ formValues, setFormValues ] = useState({
    id_ami: "",
    description: "",
  });

  const [ files, setFiles ] = useState(['fichier0']);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  const handleFileChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.files[0]
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const data = validateDepotDossier(formValues);
    for (const [key, value] of Object.entries(data))
    {
      if (value) {
        setErrors(data);
        return;
      }
    }
    try {
      const responseData = await DocumentApi.post('/ajout', formValues);
      console.log('Response from server:', responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleRemoveFile = (file) => {
    const newFormValues = {};
    Object.keys(formValues).forEach(key => {
      if (key !== file)
        newFormValues[key] = formValues[key];
    })
    setFiles(files.filter((item) => item !== file ))
    setFormValues(newFormValues)
  }

  return (
    <>
        <Title title={`Ajout de Dossiers pour un AMI`} />
        <div className={style.container}>
            <form 
                className={style.formContainer}
                onSubmit={handleSubmit}
            >
                <InputContainer>
                  <Label value="N° AMI" name="id_ami" required={true} />
                  <InputTexte
                      type="text"
                      value={formValues["id_ami"]}
                      name="id_ami"
                      placeholder="Entrez le N° Ref AMI"
                      handleChange= {handleChange}
                  />
                  <Error value={errors["id_ami"]} />
                </InputContainer>

                <InputContainer>
                  <Label value="Description" name="Description" />
                  <Textarea
                      name="Description"
                      placeholder="Ajoutez votre commentaire ici..."
                      value={formValues["description"]}
                      handleChange={handleChange}
                  />
                  <Error value={errors["description"]} />
                </InputContainer>

                <InputContainer>
                  <Label value="Dossier DAO" name="fichier" required={true} />
                  {
                    files.map((file) => (
                      <div className={style.fileContainer}>
                        <FileInput
                          key={file}
                          name={file}
                          handleFileChange={handleFileChange}
                        />
                        <Button
                          type="button" 
                          value="X"
                          handleClick={(e) => handleRemoveFile(file)}
                        />
                      </div>
                    ))
                  }
                  <Button
                      type="button" 
                      value="Ajouter une autre fichier"
                      handleClick={() => setFiles([...files, `fichier${files.length + 1}`])}
                  />
                  <Error value={errors["fichier"]} />
                </InputContainer>
                <div className={style.buttonContainer}>
                  <Button
                      type="submit" 
                      value="Soumettre"
                  />
                </div>
            </form>
        </div>
    </>
  );
}

export default AjoutDossier;
