import React, { useEffect, useState } from "react";
import Button from "../components/form/Button";
import Table from "../components/tableau/Table";
import Title from "../components/Title";
import style from "./ListeAmi.module.css";
import AmiApi from "../api/AmiApi";
import { useNavigate, useParams } from "react-router-dom";
import AmiMenu from "../components/AmiMenu";
import ConfirmationModal from "../components/ConfirmationModal";
import Error from "../components/form/Error";

const ListeAmi = () => {
    const [amiList, setAmiList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [selectedAmiId, setSelectedAmiId] = useState(null);
    const [error, setError] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false);
    const { page } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchAmiList = async () => {
          try {
              setError(false)
              const newList = await AmiApi.getListByPage(page) || [];
              setAmiList(newList);
          } catch (err) {
              setError(true)
          }
      };
      
      fetchAmiList();
    }, [page]); 

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
                const response = await AmiApi.removeAmiById(selectedAmiId);
                setAmiList(amiList.filter(ami => ami.id_ami !== selectedAmiId));
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
        <Title title="Liste des AMIs"/>
        <AmiMenu 
          page={page} 
          totalPage={totalPage}
          setAmiList={setAmiList}
        />
        <div className={style.container}>
          {amiList.length > 0 &&
            <Table
                headers={["Ref AMI", "Action"]}
            >
                {amiList.map((item) => (
                    <tr key={item.id_ami}>
                      <td>{item.id_ami}</td>
                      <td>
                        <Button
                          type="button"
                          value="DAO"
                          handleClick={() => {navigate(`/documents/${encodeURIComponent(item.id_ami)}`)}}
                        />
                        <Button
                          type="button"
                          value="Email"
                          handleClick={() => {navigate(`/superviseur/${encodeURIComponent(item.id_ami)}`)}}
                        />
                        <Button
                          type="button"
                          value="Supprimer"
                          handleClick={() => handleDeleteButtonClick(item.id_ami)}
                        />
                      </td>
                    </tr>
                ))}
            </Table>
          }
          {
            amiList && !error && amiList.length === 0 &&
            <p style={{textAlign: "center"}}>Aucune liste d'AMI.</p>
          }
          {
            error &&
            (
              <div style={{textAlign: "center"}}><Error value="Erreur lors de la récupération de la liste."/></div>
            )
          }
        </div>
        <ConfirmationModal
            isOpen={showConfirmation}
            onCancel={() => setShowConfirmation(false)}
            onConfirm={handleRemoveAmi} // Remove AMI on confirm
        >
            <p>Êtes-vous sûr de vouloir supprimer cet AMI ?</p>
        </ConfirmationModal>
      </>
    );
}

export default ListeAmi;
