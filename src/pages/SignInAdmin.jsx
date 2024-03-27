import { useState } from "react"
import Titre from "../components/Title"
import InputContainer from "../components/form/InputContainer"
import InputTexte from "../components/form/InputTexte"
import Label from "../components/form/Label"
import Error from "../components/form/Error"
import Button from "../components/form/Button"

import style from "./SignInAdmin.module.css"
import AdminApi from "../api/AdminApi"
import AuthService from "../helpers/AuthService"
import { useNavigate } from "react-router-dom"
import { validateSignIn } from "../helpers/validateForm";

const SignInAdmin = () => {

    const [signinValues, setSignInValues] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setSignInValues({
            ...signinValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const error = validateSignIn(signinValues);
            if (error) {
                setError(error);
                return;
            }
            const response = await AdminApi.post('/signin', signinValues);
            const { token } = response;
            AuthService.setToken(token);
            navigate('/ami')
        } catch (error) {
                setError(error.response.data.message || "internal error");
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
                    <InputContainer>
                        <Error value={error} />
                    </InputContainer>
                    <InputContainer>
                        <Label value="Email" name="email"/>
                        <InputTexte
                            type="email"
                            name="email"
                            value={signinValues["email"]}
                            handleChange={handleChange}
                            placeholder="Entrez votre email"
                        />
                    </InputContainer>
                    <InputContainer>
                        <Label value="Mot de Passe" name="password"/>
                        <InputTexte
                            type="password"
                            name="password"
                            value={signinValues["password"]}
                            handleChange={handleChange}
                            placeholder="Entrez votre Mot de Passe"
                        />
                    </InputContainer>
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

export default SignInAdmin