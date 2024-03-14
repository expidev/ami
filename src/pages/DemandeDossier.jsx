import { useState } from "react";
import InputTexte from "../components/InputTexte";
import { inputList } from "../content/listeInputDemandeDossier";

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
      <h1>Dossiers pour l'AMI N° 123456</h1>
      <form className="demande-form form-container">
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
        <button type="submit" className="submit-button">Demander</button>
      </form>
    </div>
  );
}

export default DemandeDossier;
