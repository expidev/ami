import { useState } from "react"
import InputTexte from "./form/InputTexte"
import Label from "./form/Label"
import GroupContainer from "./GroupContainer"

import style from "./AjoutEmail.module.css"
import Button from "./form/Button"
import Error from "./form/Error"
import SuperviseurApi from "../api/SuperviseurApi"
import { validateAjoutEmail } from "../helpers/validateForm"


const AjoutEmail = ({ id_ami, setTrigger }) => {
    const [ formValues, setFormValues ] = useState({
        nom: "",
        email: "",
        id_ami
    })
    const [ errors, setErrors ] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
          ...formValues,
          [name]: value
        });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors({});

      const isError = validateAjoutEmail(formValues)
      for (const [key, value] of Object.entries(isError))
      {
        if (value) {
          setErrors(isError);
          return;
        }
      }
      try {
        const responseData = await SuperviseurApi.post('/ami/email', formValues);
        setTrigger(prev => !prev)
        setFormValues({nom: '', email: '', id_ami});
      } catch (error) {
        console.error('Error:', error);
      }

    }

    return (
        <div className={style.container}>
            <form
                className={style.formContainer}
                onSubmit={handleSubmit}
            >
                <GroupContainer>
                    <Label value="Nom" name="nom"/>
                    <InputTexte
                        type="text"
                        name="nom"
                        value={formValues["nom"]}
                        handleChange={handleChange}
                        placeholder="Entrez le nom"
                    />
                    <Error value={errors["nom"]} />
                </GroupContainer>
                <GroupContainer>
                    <Label value="Email" name="email"/>
                    <InputTexte
                        type="email"
                        name="email"
                        value={formValues["email"]}
                        handleChange={handleChange}
                        placeholder="Entrez l'email"
                    />
                    <Error value={errors["email"]} />
                </GroupContainer>
                <div className={style.buttonContainer}>
                    <Button
                        type="submit"
                        value="Ajouter"
                    />
                </div>
            </form>
        </div>
    )
}

export default AjoutEmail