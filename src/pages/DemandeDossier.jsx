import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import InputTexte from "../components/form/InputTexte";
import { inputList } from "../content/listeInputDemandeDossier";
import Title from "../components/Title";
import Button from "../components/form/Button";
import GroupContainer from "../components/GroupContainer";
import Label from "../components/form/Label";
import Error from "../components/form/Error";

import style from "./DemandeDossier.module.css";
import { validateDemandeDossier } from "../helpers/validateForm";
import VisitorApi from "../api/VisitorApi.js";


const DemandeDossier= () => {

  const [ formValues, setFormValues ] = useState({
    type: "entreprise",
    nom: "",
    prenom: "",
    cin_nif: "",
    email_entreprise: "",
    telephone1: "",
    telephone2: "",
    telephone3: ""
  });
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isFailed, setIsFailed ] = useState(false)

  const [ errors, setErrors ] = useState({});

  const { id_ami } = useParams();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const data = validateDemandeDossier(formValues);
  
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        setErrors(data);
        return;
      }
    }
    setIsLoading(true);
    setIsFailed(false);
  
    try {
      const responseData = await VisitorApi.post('/', {...formValues, id_ami});
      console.log('Response from server:', responseData);
      navigate(`/lien_de_confirmation/${encodeURIComponent(id_ami)}`, {replace: true})
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setIsFailed(true)
      console.error('Error:', error);
    }
  };
  

  return (
    <>
      <Title title={`Formulaire de téléchargement de dossiers pour l'appel d'offre ${id_ami}`} />
      <div className={style.container}>
        <form 
          className={style.formContainer}
          onSubmit={handleSubmit}
        >
          <p style={{color: "rgb(199, 78, 30)"}}>Les champs marqués avec (*) sont obligatoires.</p>
          <GroupContainer>
                <Label 
                  value="Type"
                  name="type"
                  required={true}
                />
           <fieldset className={style.radioFieldset}>
              <div className={style.radioContainer}>
                  <label className={style.radioLabel}>
                      <input
                        type="radio"
                        className={style.radioInput}
                        checked={formValues.type === "entreprise"}
                        value="entreprise"
                        name="type"
                        onChange={handleChange}
                      />
                        Entreprise
                  </label>
                  <label className={style.radioLabel}>
                        <input
                          type="radio"
                          className={style.radioInput}
                          checked={formValues.type === "individu"}
                          name="type"
                          onChange={handleChange}
                          value="individu"
                        />
                        Individu
                  </label>
              </div>

              <Error value={errors["type"]} />
            </fieldset>
          </GroupContainer>         
          {
            inputList.map((item, index) => (
              <GroupContainer key={index}>
                <Label 
                  value={item.name === "nom" && formValues.type === "entreprise" ? 
                  "Nom de l'entreprise" : item.name === "nom" && formValues.type === "individu" ? 
                  "Nom et Prenom du Candidat" : item.label
                } 
                  name={item.name}
                  required={item.required}
                />
                <InputTexte
                  {...item}
                  value={formValues[item.name]}
                  handleChange= {handleChange}
                />
                <Error value={errors[item.name]} />
              </GroupContainer>
            ))
          }
          <div className={style.buttonContainer}>
            <Button
              type="submit"
              value="Demander"
            />
            { isLoading && (
              <div>
                <div>
                  <p style={{textAlign:"left"}}>...En cours</p>
                </div>
              </div>
            )
            }
            {isFailed && <Error value="Echoué"/>}
          </div>
        </form>
      </div>
    </>
  );
}

export default DemandeDossier;