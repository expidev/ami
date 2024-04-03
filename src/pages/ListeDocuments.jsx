import { useEffect, useState } from "react";
import Title from "../components/Title";
import Button from "../components/form/Button";
import Table from "../components/tableau/Table";
import style from "./ListeDocuments.module.css";
import DocumentApi from "../api/DocumentApi";
import { useParams } from "react-router-dom";
import AjoutDossier from "../components/AjoutDossier";

const ListeDocuments = () => {

    const [documents, setDocuments] = useState([]);
    const [ trigger, setTrigger ] = useState(false);
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
        fetchDocumentByid_ami(id_ami);
      }
    }, [trigger])

    const handleRemoveDocument = async (documentId, fileName) => {
        try {
          await DocumentApi.removeDocument(documentId, fileName);
          setTrigger(prev => !prev);
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
              trigger={trigger}
              setTrigger={setTrigger} 
            />
          </div>
          {documents.length > 0  && 
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
                          handleClick={(e) => handleRemoveDocument(item.id_fichier, item.nom_fichier)}
                        />
                      </td>
                    </tr>
                    ))}
                </Table>
              </>
           }
        </div>
      </>
    );
  }
  
export default ListeDocuments;