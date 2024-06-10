import { useState } from "react"
import Titre from "../components/Title"
import GroupInput from "../components/GroupInput"
import Input from "../components/form/Input"
import Label from "../components/form/Label"
import Error from "../components/form/Error"

import style from "./Signin.module.css"
import AdminApi from "../api/AdminApi"
import AuthService from "../helpers/AuthService"
import { useNavigate } from "react-router-dom"
import { validateSignIn } from "../helpers/validateForm";
import { signinContent } from "../content/signinContent"
import SubmitButton from "../components/form/SubmitButton"

const Signin = () => {

    const [ formValues, setFormValues ] = useState({
        email: "",
        mot_de_passe: ""
    });
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState("");
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
        setIsLoading(true);
        try {
            const error = validateSignIn(formValues);
            if (error) {
                setIsLoading(false)
                setError(error);
                return;
            }
            const response = await AdminApi.signin(formValues);
            // setting the JWT Token for the authorization
            const { token } = response;
            AuthService.setToken(token);
            navigate('/ami/page/1')
        } catch (error) {
            setError(
                error.response ? error.response.data.message 
                : "Erreur serveur"
            );
        } finally {
            setIsLoading(false)
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
                    <GroupInput>
                        <Error value={error} />
                    </GroupInput>

                    {
                        signinContent.map((item, index) => (
                        <GroupInput key={index}>
                            <Label 
                                value={item.label}
                                name={item.name}
                                required={item.required}
                            />
                            <Input
                                {...item}
                                value={formValues[item.name]}
                                handleChange= {handleChange}
                            />
                        </GroupInput>
                        ))
                    }                    
                    <div className={style.buttonContainer}>
                        <SubmitButton
                            type="submit"
                            value="Connecter"
                        />
                        { isLoading && (
                            <div>
                                <div>
                                <p className={style.loading}>...En cours</p>
                                </div>
                            </div>
                        )
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signin