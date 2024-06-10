import Title from "../components/Title";
import style from "./NouveauDAO.module.css";
import AjoutDossier from "../components/AjoutDossier";
import { useState } from "react";

const NouveauDAO = () => {

    const [trigger, setTrigger] = useState(false);

    return (
        <>
            <Title 
                title="Ajout de DAO pour un Appel d'Offre"
            />
            <div className={style.container}>
                <div className={style.editContainer}>
                    <AjoutDossier
                        isNewAmi={true}
                        trigger={trigger}
                        setTrigger={setTrigger}
                    />
                </div>
            </div>
        </>
    );
}

export default NouveauDAO;
