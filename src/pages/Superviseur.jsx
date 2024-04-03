import { useEffect, useState } from "react";
import Titre from "../components/Title";
import { useParams } from "react-router-dom";
import Table from "../components/tableau/Table";

import style from "./Superviseur.module.css"
import SuperviseurApi from "../api/SuperviseurApi";
import Button from "../components/form/Button";
import AjoutEmail from "../components/AjoutEmail";


const Superviseur = () => {
    const [ superviseurList, setSuperviseurList ] = useState([]);
    const [ trigger, setTrigger ] = useState(false);
    const { id_ami } = useParams();

    useEffect(() => {
        const fetchSuperviseur = async () => {
            try {
                const response = await SuperviseurApi.getSuperviseur(`/superviseur/${id_ami}`);
                setSuperviseurList(response);
            }
            catch (err)
            {
                console.log(err.message)
            }
        }
        fetchSuperviseur()
    }, [trigger]);

    const handleRemoveEmail = async (id) => {
        try {
            await SuperviseurApi.removeSuperviseur(id);
            setTrigger(prev => !prev);
          } catch (err) {
            console.log(err.message);
          }
    }

    return (
        <>
            <Titre title={`Liste des superviseurs pour l'AMI N° ${id_ami}`} />
            <AjoutEmail id_ami={id_ami} setTrigger={setTrigger}/>
            <div className={style.container}>
            {superviseurList.length > 0 &&
            <Table
                headers={["Email", "Action"]}
            >
                {superviseurList.length > 0 && superviseurList.map((item) => (
                    <tr key={item.id}>
                        <td>{item.email}</td>
                        <td>
                            <Button
                                type="button"
                                value="Supprimer"
                                handleClick={() => {handleRemoveEmail(item.id)}}
                            />
                        </td>
                    </tr>
                ))}
            </Table>
            }
            </div>
        </>
    );
}

export default Superviseur;