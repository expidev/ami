import { useState } from "react";
import InputTexte from "../components/InputTexte";

import style from "./AjoutDossier.module.css";
import Titre from "../components/Titre";

const AjoutDossier= () => {

  const [ formValues, setFormValues ] = useState({
    fichier: "",
    ami: "",
    description: "",
  });

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
    console.log(formValues);
  }

  return (
    <>
        <Titre title="Ajout de Dossiers pour l'AMI N° 123456" />
        <div className={style.container}>
            <form 
                className={`${style.demandeForm} ${style.formContainer}`}
                onSubmit={handleSubmit}
            >
                <InputTexte
                    label="AMI"
                    type="text"
                    value={formValues["ami"]}
                    name="ami"
                    handleChange= {handleChange}
                />
                <div className={style.formGroup}>
                    <label className={style.label} htmlFor="description">Description</label>
                    <textarea
                        className={style.textarea}
                        id="description"
                        onChange={handleChange}
                        name="description"
                        value={formValues["description"]}
                    />
                </div>
                <div className={style.formGroup}>
                    <label className={style.label} htmlFor="fichier">Dossier DAO</label>
                    <input 
                        className={style.input} 
                        type="file" 
                        onChange={handleFileChange} 
                        name="fichier"
                    />
                </div>
                <input
                    type="submit" 
                    className={style.submitButton}
                    value="Soumettre"
                />
            </form>
        </div>
    </>
  );
}

export default AjoutDossier;
