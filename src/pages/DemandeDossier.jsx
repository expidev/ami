import { useState } from "react";
import InputTexte from "../components/InputTexte";
import { inputList } from "../content/listeInputDemandeDossier";

import style from "./DemandeDossier.module.css";
import Titre from "../components/Titre";

const DemandeDossier= () => {

  const [ formValues, setFormValues ] = useState({
    nom: "",
    prenom: "",
    id_candidat: "",
    email: "",
    contact: ""
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues);
  }

  return (
    <>
      <Titre title="Dossiers pour l'AMI N° 123456" />
      <div className={style.container}>
        <form 
          className={`${style.demandeForm} ${style.formContainer}`}
          onSubmit={handleSubmit}
        >
          {
            inputList.map((item, index) => (
              <InputTexte
                key={index}
                label={item.label}
                type={item.type}
                value={formValues[item.name]}
                name={item.name}
                handleChange= {handleChange}
              />
            ))
          }
          <input
            type="submit" 
            className={style.submitButton}
            value="Demander"
          />
        </form>
      </div>
    </>
  );
}

export default DemandeDossier;
