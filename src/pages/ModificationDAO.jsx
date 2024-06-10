import { useEffect, useState } from "react";
import Title from "../components/Title";
import Table from "../components/tableau/Table";
import style from "./ModificationDAO.module.css";
import DocumentApi from "../api/DocumentApi";
import AmiApi from "../api/AmiApi";
import { useParams } from "react-router-dom";
import AjoutDossier from "../components/AjoutDossier";
import ConfirmationModal from "../components/ConfirmationModal"; 
import SimpleButton from "../components/form/SimpleButton";

const ModificationDAO = () => {

    const [documents, setDocuments] = useState([]);
    const [ami, setAmi] = useState({
      description: ""
    })
    const [showConfirmation, setShowConfirmation] = useState(false); // State for showing/hiding confirmation popup
    // selected temporary for the confirmation modal
    const [selectedDocument, setSelectedDocument] = useState({
      id: "",
      fileName: ""
    })
    const [trigger, setTrigger] = useState(false);
    const { ref_ami } = useParams();

    useEffect(() => {
      const fetchDocumentByRef = async(ref_ami) => {
        try {
          const newDocuments = await DocumentApi.getDocumentByRef(ref_ami);
          setDocuments(newDocuments);
        }
        catch(err) {
          console.log(err.message)
        }
      }

      const getAmiByRef = async(ref_ami) => {
        try {
          const newAmi = await AmiApi.getAmiByRef(ref_ami);
          setAmi(newAmi);
        }
        catch(err) {
          console.log(err.message)
        }
      }
      fetchDocumentByRef(ref_ami);
      getAmiByRef(ref_ami);
    }, [ref_ami, trigger])

    const handleRemoveDocument = async (documentId, fileName) => {
        try {
          await DocumentApi.removeDocument(documentId, fileName);
          setShowConfirmation(false);
          setTrigger(prev => !prev);
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
          title={`Liste des documents pour l'appel d'offre ${ref_ami}`}
        />
        <div className={style.container}>
          <div className={style.editContainer}>
            <AjoutDossier
              ref_ami={ref_ami}
              isNewAmi={false}
              trigger={trigger}
              setTrigger={setTrigger}
            />
          </div>

          <div className={style.description}>
            <h2 className={style.subtitle}>Description</h2>
            <p>{ami ? ami.description : "Pas de description."}</p>
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
                        <SimpleButton
                          value="Télécharger"
                          handleClick={(e) => {handleDownloadDocument(item.type_fichier, item.nom_fichier)}}
                        />
                        <SimpleButton
                          value="Supprimer"
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

export default ModificationDAO;
