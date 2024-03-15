import { useState } from "react";
import InputTexte from "../components/InputTexte";
import { inputList } from "../content/listeInputDemandeDossier";

import style from "./DemandeDossier.module.css";

const DemandeDossier= () => {

  const [ formValues, setFormValues ] = useState({
    nom: "",
    prenom: ""
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div>
      <h1 className={style.title}>Dossiers pour l'AMI N° 123456</h1>
      <form className={`${style.demandeForm} ${style.formContainer}`}>
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
  );
}

export default DemandeDossier;
