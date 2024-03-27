import { useEffect, useState } from "react";
import InputTexte from "../components/form/InputTexte";

import style from "./AjoutDossier.module.css";
import { validateDepotDossier } from "../helpers/validateForm";
import Textarea from "../components/form/Textarea";
import Button from "../components/form/Button";
import Label from "../components/form/Label";
import InputContainer from "../components/form/InputContainer";
import Error from "../components/form/Error";
import DocumentApi from "../api/DocumentApi";
import AmiApi from "../api/AmiApi";
import FileInput from "../components/form/FileInput";

const AjoutDossier= ({ id_ami, trigger, setTrigger }) => {

  const [ formValues, setFormValues ] = useState({
    id_ami: "",
    description: "",
  });

  const [ files, setFiles ] = useState(['fichier0']);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAmi = async () => {
      try {
          const newAmi = await AmiApi.getAmiById(id_ami);
          setFormValues({
            ...formValues, 
            id_ami: newAmi.id_ami,
            description: newAmi.description
          });
      } catch (err) {
          console.error("Error fetching AMI list:", err);
      }
    };
    fetchAmi(id_ami);
  }, [trigger])

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
      setTrigger(prev => !prev)
      setFiles(files[0] == 'fichier'? ['fichier0'] : ['fichier'])
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
                      disabled
                      handleChange= {handleChange}
                  />
                  <Error value={errors["id_ami"]} />
                </InputContainer>

                <InputContainer>
                  <Label value="Description" name="description" />
                  <Textarea
                      name="description"
                      placeholder="Mettre à jour la description des DAOs ici... "
                      value={formValues["description"]}
                      handleChange={handleChange}
                  />
                  <Error value={errors["description"]} />
                </InputContainer>

                <InputContainer>
                  <Label value="Dossier DAO" name="fichier" />
                  {
                    files.map((file) => (
                      <div 
                        key={file} 
                        className={style.fileContainer}
                      >
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
                        <Error value={errors[file]} />
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