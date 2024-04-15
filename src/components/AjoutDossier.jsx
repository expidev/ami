import { useEffect, useState } from "react";
import InputTexte from "./form/InputTexte";

import style from "./AjoutDossier.module.css";
import { validateDepotDossier } from "../helpers/validateForm";
import Textarea from "./form/Textarea";
import Button from "./form/Button";
import Label from "./form/Label";
import GroupContainer from "./GroupContainer";
import Error from "./form/Error";
import DocumentApi from "../api/DocumentApi";
import AmiApi from "../api/AmiApi";
import FileInput from "./form/FileInput";
import DemandeLink from "./DemandeLink";
import { useNavigate } from "react-router-dom";

const AjoutDossier= ({ id_ami, isNewAmi, trigger, setTrigger }) => {

  const [ formValues, setFormValues ] = useState({
    id_ami: id_ami || "",
    description: "",
  });
  const [ files, setFiles ] = useState(['fichier0']);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()

  useEffect(() => {
    const fetchAmi = async (id_ami) => {
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
    if (!isNewAmi)
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
      setFiles(files[0] == 'fichier'? ['fichier0'] : ['fichier'])
      setTrigger(prev => !prev)
      if (isNewAmi) {
        navigate(`/documents/${encodeURIComponent(formValues.id_ami)}`, {replace: true})
      }
      setFormValues({id_ami: formValues.id_ami, description: formValues.description})
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
            {!isNewAmi && <DemandeLink id_ami={formValues['id_ami']} />}
            <form
                className={style.formContainer}
                onSubmit={handleSubmit}
            >
                <GroupContainer>
                  <Label value="N° AMI" name="id_ami" required={true} />
                  <InputTexte
                      type="text"
                      value={formValues["id_ami"]}
                      name="id_ami"
                      placeholder="Entrez le N° Ref AMI"
                      disabled = {id_ami ? true : false}
                      handleChange= {handleChange}
                  />
                  <Error value={errors["id_ami"]} />
                </GroupContainer>

                <GroupContainer>
                  <Label value="Description" name="description" />
                  <Textarea
                      name="description"
                      placeholder="Mettre à jour la description des DAOs ici... "
                      value={formValues["description"]}
                      handleChange={handleChange}
                  />
                  <Error value={errors["description"]} />
                </GroupContainer>

                <GroupContainer>
                  <Label value="Dossier DAO" name="fichier" required={true} />
                  {
                    files.map((file) => (
                      <div key={file} >
                        <div 
                          className={style.fileContainer}
                        >
                          <FileInput
                            key={file}
                            name={file}
                            handleFileChange={handleFileChange}
                            accept="image/*,.pdf,.docx,.ppt,.xlsx"
                          />
                          <Button
                            type="button" 
                            value="X"
                            handleClick={(e) => handleRemoveFile(file)}
                          />
                        </div>
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
                </GroupContainer>
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