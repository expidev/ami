import { useState } from "react"
import Input from "./form/Input"
import Label from "./form/Label"
import GroupInput from "./GroupInput"

import style from "./AjoutEmail.module.css"
import Error from "./form/Error"
import SuperviseurApi from "../api/SuperviseurApi"
import { validateAjoutEmail } from "../helpers/validateForm"
import SubmitButton from "./form/SubmitButton"


const AjoutEmail = ({ ref_ami, setTrigger }) => {
    const [ formValues, setFormValues ] = useState({
        nom: "",
        email: "",
        ref_ami
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
        await SuperviseurApi.post(formValues);
        setTrigger(prev => !prev)
        setFormValues({nom: '', email: '', ref_ami});
      } catch (error) {
        // case of duplicate email. status 409
		if (error.request.status == 409) {
			setErrors({email: "Email déjà existant."})
		}
        console.error('Error:', error);
      }

    }

    return (
        <div className={style.container}>
            <form
                className={style.formContainer}
                onSubmit={handleSubmit}
            >
                <GroupInput>
                    <Label value="Nom" name="nom" required={true} />
                    <Input
                        type="text"
                        name="nom"
                        value={formValues["nom"]}
                        handleChange={handleChange}
                        placeholder="Entrez le nom"
                    />
                    <Error value={errors["nom"]} />
                </GroupInput>
                <GroupInput>
                    <Label value="Email" name="email" required={true} />
                    <Input
                        type="email"
                        name="email"
                        value={formValues["email"]}
                        handleChange={handleChange}
                        placeholder="Entrez l'email"
                    />
                    <Error value={errors["email"]} />
                </GroupInput>
                <div className={style.buttonContainer}>
                    <SubmitButton
                        value="Ajouter"
                    />
                </div>
            </form>
        </div>
    )
}

export default AjoutEmail