import { useEffect, useState } from "react";
import Title from "../components/Title";
import Button from "../components/form/Button";
import Table from "../components/tableau/Table";
import style from "./ListeDocuments.module.css";
import DocumentApi from "../api/DocumentApi";
import AmiApi from "../api/AmiApi";
import { useParams } from "react-router-dom";
import AjoutDossier from "../components/AjoutDossier";
import ConfirmationModal from "../components/ConfirmationModal"; 

const ListeDocuments = () => {

    const [documents, setDocuments] = useState([]);
    const [ami, setAmi] = useState({})
    const [showConfirmation, setShowConfirmation] = useState(false); // State for showing/hiding confirmation popup
    const [selectedDocument, setSelectedDocument] = useState({
      id: "",
      fileName: ""
    })
    const [refetch, setRefetch] = useState(false);
    const { id_ami } = useParams();

    useEffect(() => {
      if (id_ami) {
        const fetchDocumentByid_ami = async(id_ami) => {
          try {
            const newDocuments = await DocumentApi.getDocumentByAmi(id_ami);
            setDocuments(newDocuments);
          }
          catch(err) {
            console.log(err.message)
          }
        }

        const getAmiById = async(id_ami) => {
          try {
            const newAmi = await AmiApi.getAmiById(id_ami);
            setAmi(newAmi);
          }
          catch(err) {
            console.log(err.message)
          }
        }
        fetchDocumentByid_ami(id_ami);
        getAmiById(id_ami);
      }
    }, [id_ami, refetch])

    const handleRemoveDocument = async (documentId, fileName) => {
        try {
          await DocumentApi.removeDocument(documentId, fileName);
          setShowConfirmation(false);
          setRefetch(prev => !prev);
          setSelectedDocument({id: "", fileName: ""})
        } catch (err) {
          console.log(err.message);
        }
    }

    const handleDownloadDocument = async (fileType, fileName) => {
      try {
        const response = await DocumentApi.downloadDocument(fileType, fileName);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.log(err.message);
      }
    }

    return (
      <>
        <Title 
          title={id_ami ? `Liste des documents pour l'AMI N° ${id_ami}` :
            "Ajout de DAO pour un AMI"
          }
        />
        <div className={style.container}>
          <div className={style.editContainer}>
            <AjoutDossier
              id_ami={id_ami}
              isNewAmi={id_ami ? false : true}
              setTrigger={setRefetch}
            />
          </div>
          <div className={style.description}>
            <h2 className={style.subtitle}>Description</h2>
            <p>{ami.description ? ami.description : "Pas de description."}</p>
          </div>
          {documents.length > 0 && 
              <>
                <Table
                  headers={["Intitulé", "Action"]}
                >
                    {documents.map(item => (
                    <tr key={item.id_fichier}>
                      <td>{item.nom_fichier}</td>
                      <td>
                        <Button
                          value="Télécharger"
                          type="button"
                          handleClick={(e) => {handleDownloadDocument(item.type_fichier, item.nom_fichier)}}
                        />
                        <Button
                          value="Supprimer"
                          type="button"
                          handleClick={(e) => {
                            setShowConfirmation(true);
                            setSelectedDocument({
                              id: item.id_fichier,
                              fileName: item.nom_fichier
                            })
                          }}
                        />
                      </td>
                    </tr>
                    ))}
                </Table>
              </>
           }
        </div>
        {/* Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmation}
          onCancel={() => setShowConfirmation(false)}
          onConfirm={() => handleRemoveDocument(
            selectedDocument.id,
            selectedDocument.fileName
          )}
        >
          <p>Êtes-vous sûr de vouloir supprimer le document ${selectedDocument.fileName} ?</p>
        </ConfirmationModal>
      </>
    );
}

export default ListeDocuments;
