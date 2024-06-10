import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Input from "../components/form/Input";
import { inputList } from "../content/listeInputDemandeDossier";
import Title from "../components/Title";
import GroupInput from "../components/GroupInput";
import Label from "../components/form/Label";
import Error from "../components/form/Error";

import style from "./DemandeDossier.module.css";
import { validateDemandeDossier } from "../helpers/validateForm";
import VisitorApi from "../api/VisitorApi.js";
import SelectInput from "../components/form/SelectInput";
import SubmitButton from "../components/form/SubmitButton";
import RegionApi from "../api/RegionApi";


const DemandeDossier= () => {

  const [ formValues, setFormValues ] = useState({
    type: "entreprise",
    nom: "",
    cin_nif: "",
    adresse: "",
    email: "",
    telephone1: "",
    telephone2: "",
    telephone3: ""
  });
  const [ region, setRegion ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false)
  const [ isFailed, setIsFailed ] = useState(false)
  const [ errors, setErrors ] = useState({});

  const { ref_ami } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegion = async() => {
      try {
        const response = await RegionApi.getRegion()
        setRegion(response);
      } catch (error) {
        console.log(error)
        throw error;
      }
    }

    fetchRegion()
  }, [])

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
      const body = {...formValues, ref_ami}
      await VisitorApi.post(body);
      navigate(`/lien_de_confirmation/${encodeURIComponent(ref_ami)}`, {replace: true})
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setIsFailed(true)
      console.error('Error:', error);
    }
  };

  const changeLabelByNomAndType = (name, type, label) => {
      if (name === "nom") {
        if (type == "entreprise")
          return "Nom de l'entreprise";
        else
          return "Nom et Prénom du Candidat"
      } else {
          return label
      }
  }

  const changePlaceholderByNomAndType = (name, type, placeholder) => {
    if (name === "nom") {
      if (type == "entreprise")
        return "Entrez votre nom d'entreprise";
      else
        return "Entrez votre nom et prénom"
    } else {
        return placeholder
    }
}
  

  return (
    <>
      <Title title={`Formulaire de téléchargement de dossiers pour l'appel d'offre ${ref_ami}`} />
      <div className={style.container}>
        <form 
          className={style.formContainer}
          onSubmit={handleSubmit}
        >
          <p className={style.notice}>Les champs marqués avec (*) sont obligatoires.</p>
          <GroupInput>
                <Label 
                  value="Type"
                  name="type"
                  required={true}
                />
           <fieldset className={style.radioFieldset}>
              <div className={style.radioContainer}>
                  {
                    ["entreprise", "individu"].map(item => (
                      <label 
                        key={item}
                        className={style.radioLabel}
                      >
                        <input
                          type="radio"
                          className={style.radioInput}
                          checked={formValues.type === item}
                          value={item}
                          name="type"
                          onChange={handleChange}
                        />
                          {item}
                    </label>
                    ))
                  }
              </div>

              <Error value={errors["type"]} />
            </fieldset>
          </GroupInput>
          {
            inputList.map((item, index) => (
              <GroupInput key={index}>
                {item.type === "select" ? (
                  <>
                      <Label 
                        value={item.label}
                        name={item.name}
                        required={item.required}
                      />
                      <SelectInput
                        {...item}
                        options={region}
                        value={formValues[item.name]}
                        handleChange= {handleChange}
                        placeholder={item.placeholder}
                      />
                      <Error value={errors[item.name]} />
                  </>
                ) : (
                  <>
                      <Label 
                        value={
                          changeLabelByNomAndType(item.name, formValues.type, item.label)
                        } 
                        name={item.name}
                        required={item.required}
                      />
                      <Input
                        {...item}
                        placeholder={
                          changePlaceholderByNomAndType(item.name, formValues.type, item.placeholder)
                        }
                        value={formValues[item.name]}
                        handleChange= {handleChange}
                      />
                      <Error value={errors[item.name]} />
                  </>
                )}
              </GroupInput>
            ))
          }
          <div className={style.buttonContainer}>
            <SubmitButton
              value="Demander"
            />
            { isLoading && (
              <div>
                  <p className={style.loading}>...En cours</p>
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