import React, { useEffect, useState } from "react";
import Table from "../components/tableau/Table";
import Title from "../components/Title";
import style from "./ListeAmi.module.css";
import AmiApi from "../api/AmiApi";
import { useNavigate, useParams } from "react-router-dom";
import AmiMenu from "../components/AmiMenu";
import ConfirmationModal from "../components/ConfirmationModal";
import Error from "../components/form/Error";
import SimpleButton from "../components/form/SimpleButton";

const ListeAmi = () => {
    const [ amiList, setAmiList ] = useState([]);
    const [ totalPage, setTotalPage ] = useState(1);
    const [ selectedAmiId, setSelectedAmiId ] = useState(null);
    const [ trigger, setTrigger ] = useState(false);
    const [ error, setError ] = useState(false)
    const [ showConfirmation, setShowConfirmation ] = useState(false);
    const { page } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchAmiList = async () => {
          try {
              setError(false)
              const newList = await AmiApi.getListByPage(page);
              setAmiList(newList);
          } catch (err) {
              setError(true)
          }
      };
      
      fetchAmiList();
    }, [page, trigger]); 

    useEffect(() => {
      const countPage = async () => {
          try {
              const result = await AmiApi.countPage();
              setTotalPage(Math.ceil(result.count / 10) || 1);
          } catch (err) {
              console.error("Error counting AMI list:", err);
          }
      };
      
      countPage();
    }, []);

    const handleRemoveAmi = async () => {
        try {
            if (selectedAmiId) {
                await AmiApi.removeAmiByRef(selectedAmiId);
                setAmiList(amiList.filter(ami => ami.id_ami !== selectedAmiId));
                setTrigger(prev => !prev);
                setSelectedAmiId(null); // Reset selected AMI ID
                setShowConfirmation(false); // Close modal after removal
            }
        } catch (err) {
            console.error("Error removing AMI:", err);
        }
    };

    const handleDeleteButtonClick = (id) => {
        setSelectedAmiId(id);
        setShowConfirmation(true); // Show confirmation modal
    };

    return (
      <>
        <Title title="Liste des Appels d'Offres"/>
        <div className={style.container}>
          <AmiMenu 
            page={page} 
            totalPage={totalPage}
            setAmiList={setAmiList}
          />
        </div>
        <div className={style.container}>
          {amiList.length > 0 &&
            <Table
                headers={["Ref. Appel d'offre", "Action"]}
            >
                {amiList.map((item) => (
                    <tr key={item.id_ami}>
                      <td>{item.ref_ami}</td>
                      <td>
                        <div className={style.groupButtonContainer}>
                          <SimpleButton
                            value="DAO"
                            handleClick={() => {navigate(`/modification_dao/${encodeURIComponent(item.ref_ami)}`)}}
                          />
                          <SimpleButton
                            value="Email"
                            handleClick={() => {navigate(`/superviseur/${encodeURIComponent(item.ref_ami)}`)}}
                          />
                          <SimpleButton
                            value="Supprimer"
                            handleClick={() => handleDeleteButtonClick(item.ref_ami)}
                          />
                        </div>
                      </td>
                    </tr>
                ))}
            </Table>
          }
          {
            amiList && !error && amiList.length === 0 &&
            <p className="text-center">Aucune liste d'AMI.</p>
          }
          {
            error &&
            (
              <div className="text-center"><Error value="Erreur lors de la récupération de la liste."/></div>
            )
          }
        </div>
        <ConfirmationModal
            isOpen={showConfirmation}
            onCancel={() => setShowConfirmation(false)}
            onConfirm={handleRemoveAmi} // Remove AMI on confirm
        >
            <p>Êtes-vous sûr de vouloir supprimer cet appel d'offre?</p>
        </ConfirmationModal>
      </>
    );
}

export default ListeAmi;
