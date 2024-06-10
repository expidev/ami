import React, { useEffect, useState } from "react";
import Titre from "../components/Title";
import { useParams } from "react-router-dom";
import Table from "../components/tableau/Table";

import style from "./AjoutSuperviseur.module.css";
import SuperviseurApi from "../api/SuperviseurApi";
import AjoutEmail from "../components/AjoutEmail";
import ConfirmationModal from "../components/ConfirmationModal"; 
import SimpleButton from "../components/form/SimpleButton";

const AjoutSuperviseur = () => {
    const [ superviseurList, setSuperviseurList ] = useState([]);
    const [ trigger, setTrigger ] = useState(false);
    // for temporary storing in the confirmation modal
    const [ selectedEmail, setSelectedEmail ] = useState({id: "", email: ""}); 
    const [ showConfirmation, setShowConfirmation ] = useState(false); 
    const { ref_ami } = useParams();

    useEffect(() => {
        const fetchSuperviseur = async (ref_ami) => {
            try {
                const response = await SuperviseurApi.getSuperviseur(ref_ami);
                setSuperviseurList(response);
            } catch (err) {
                console.log(err.message)
                return;
            }
        }
        fetchSuperviseur(ref_ami)
    }, [trigger]);

    const handleRemoveEmail = async (id) => {
        try {
            await SuperviseurApi.removeSuperviseur(id);
            setTrigger(prev => !prev);
            setShowConfirmation(false); 
          } catch (err) {
            console.log(err.message);
            return;
          }
    }

    const handleConfirmRemove = () => {
        if (selectedEmail.id) {
            handleRemoveEmail(selectedEmail.id);
        }
    };

    const handleCancelRemove = () => {
        setShowConfirmation(false);
    };

    const handleDeleteButtonClick = (id, email) => {
        setSelectedEmail({id, email});
        setShowConfirmation(true);
    };

    return (
        <>
            <Titre title={`Liste des superviseurs pour l' appel d' offre ${ref_ami}`} />
            <AjoutEmail ref_ami={ref_ami} setTrigger={setTrigger}/>
            <div className={style.container}>
            {superviseurList.length > 0 &&
            <Table
                headers={["Nom", "Email", "Action"]}
            >
                {superviseurList.length > 0 && superviseurList.map((item) => (
                    <tr key={item.id_superviseur}>
                        <td>{item.nom}</td>
                        <td>{item.email}</td>
                        <td>
                            <SimpleButton
                                value="Supprimer"
                                handleClick={() => handleDeleteButtonClick(item.id_superviseur, item.email)}
                            />
                        </td>
                    </tr>
                ))}
            </Table>
            }
            </div>
            <ConfirmationModal
                isOpen={showConfirmation}
                onCancel={handleCancelRemove}
                onConfirm={handleConfirmRemove}
            >
                <p>Êtes-vous sûr de vouloir supprimer l'email {selectedEmail.email} ?</p>
            </ConfirmationModal>
        </>
    );
}

export default AjoutSuperviseur;
