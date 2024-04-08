import { useState } from "react"
import Titre from "../components/Title"
import GroupContainer from "../components/GroupContainer"
import InputTexte from "../components/form/InputTexte"
import Label from "../components/form/Label"
import Error from "../components/form/Error"
import Button from "../components/form/Button"

import style from "./SigninAdmin.module.css"
import AdminApi from "../api/AdminApi"
import AuthService from "../helpers/AuthService"
import { useNavigate } from "react-router-dom"
import { validateSignIn } from "../helpers/validateForm";

const SigninAdmin = () => {

    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const error = validateSignIn(formValues);
            if (error) {
                setError(error);
                return;
            }
            const response = await AdminApi.post('/signin', formValues);
            const { token } = response;
            AuthService.setToken(token);
            navigate('/ami/1')
        } catch (error) {
            setError(error.response.data.message || "Internal error");
        }
    }

    return (
        <>
            <Titre title="Authentifier en tant qu'Administrateur"/>
            <div className={style.container}>
                <form 
                    className={style.formContainer}
                    onSubmit={handleSubmit}
                >
                    <GroupContainer>
                        <Error value={error} />
                    </GroupContainer>
                    <GroupContainer>
                        <Label value="Email" name="email"/>
                        <InputTexte
                            type="email"
                            name="email"
                            value={formValues["email"]}
                            handleChange={handleChange}
                            placeholder="Entrez votre email"
                        />
                    </GroupContainer>
                    <GroupContainer>
                        <Label value="Mot de Passe" name="password"/>
                        <InputTexte
                            type="password"
                            name="password"
                            value={formValues["password"]}
                            handleChange={handleChange}
                            placeholder="Entrez votre mot de passe"
                        />
                    </GroupContainer>
                    <div className={style.buttonContainer}>
                        <Button
                            type="submit"
                            value="Connecter"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}

export default SigninAdmin