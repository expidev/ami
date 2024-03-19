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

const AjoutDossier= () => {

  const [ formValues, setFormValues ] = useState({
    fichier: "",
    ami: "",
    description: "",
  });

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
      fichier: e.target.files[0]
    });
  }

  const handleSubmit = (e) => {
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
    console.log(formValues);
  }

  return (
    <>
        <Title title="Ajout de Dossiers pour l'AMI N° 123456" />
        <div className={style.container}>
            <form 
                className={style.formContainer}
                onSubmit={handleSubmit}
            >
                <InputContainer>
                  <Label value="N° AMI" name="ami" required={true} />
                  <InputTexte
                      type="text"
                      value={formValues["ami"]}
                      name="ami"
                      placeholder="Entrez le N° Ref AMI"
                      handleChange= {handleChange}
                  />
                  <Error value={errors["ami"]} />
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
                  <input 
                        className={style.input} 
                        type="file" 
                        onChange={handleFileChange}
                        name="fichier"
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
