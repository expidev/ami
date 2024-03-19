import { useState } from "react";
import InputTexte from "../components/form/InputTexte";
import { inputList } from "../content/listeInputDemandeDossier";

import style from "./DemandeDossier.module.css";
import Title from "../components/Title";
import { validateDemandeDossier } from "../helpers/validateForm";
import Button from "../components/form/Button";
import InputContainer from "../components/form/InputContainer";
import Label from "../components/form/Label";
import Error from "../components/form/Error";

const DemandeDossier= () => {

  const [ formValues, setFormValues ] = useState({
    nom: "",
    prenom: "",
    id_candidat: "",
    email: "",
    contact: ""
  });

  const [ errors, setErrors ] = useState({});

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const data = validateDemandeDossier(formValues);
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
      <Title title="Dossiers pour l'AMI N° 123456" />
      <div className={style.container}>
        <form 
          className={style.formContainer}
          onSubmit={handleSubmit}
        >
          {
            inputList.map((item, index) => (
              <InputContainer key={index}>
                <Label 
                  value={item.label} 
                  name={item.name}
                  required={item.required}
                />
                <InputTexte
                  {...item}
                  value={formValues[item.name]}
                  handleChange= {handleChange}
                />
                <Error value={errors[item.name]} />
              </InputContainer>
            ))
          }
          <div className={style.buttonContainer}>
            <Button
              type="submit"
              value="Demander"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default DemandeDossier;