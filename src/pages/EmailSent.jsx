import { useParams } from "react-router-dom";
import Titre from "../components/Title";

import style from "./EmailSent.module.css";

const EmailSent = () => {

    const {id_ami} = useParams();

    return (
        <>
            <Titre title="Demande enregistrée"/>
            <div className={style.container}>
                <p>Votre demande a été bien enregistrée. Un lien vous a été envoyé sur votre email 
                    pour procéder aux téléchargement des documents pour 
                    l'Appel de Manifestation d'Intérêt N° {id_ami}</p>
            </div>
        </>
    )
}

export default EmailSent;