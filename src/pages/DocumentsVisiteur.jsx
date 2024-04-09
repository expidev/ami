import { useEffect, useState } from "react";
import Title from "../components/Title";
import Button from "../components/form/Button";
import Table from "../components/tableau/Table";
import style from "./ListeDocuments.module.css";
import DocumentApi from "../api/DocumentApi";
import { useParams } from "react-router-dom";
import TokenApi from "../api/TokenApi";

const DocumentsVisiteur = () => {

    const [documents, setDocuments] = useState([]);
    const {id_ami, token} = useParams();
    const [validToken, setValidToken] = useState(false);

    useEffect(() => {
      const handleDownloadZip = async (id_ami) => {
        try {
          const response = await DocumentApi.downloadZip(id_ami);
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'dossier.zip');
          document.body.appendChild(link);
          link.click();
        } catch (err) {
          console.log(err.message);
        }
      };

      const fetchDocumentByid_ami = async (id_ami) => {
        try {
            const response = await TokenApi.getCheckToken(token);
            if (response.token) {
                setValidToken(true)
                const newDocuments = await DocumentApi.getUserDocumentByAmi(id_ami, token);
                setDocuments(newDocuments);
                await handleDownloadZip(id_ami);
            }
        }
        catch(err) {
          console.log(err.message)
        }
      }

      fetchDocumentByid_ami(id_ami);

    }, [])

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
        <Title title={`Liste des documents pour l'AMI N° ${id_ami}`}/>
        <div className={style.container}>
          {validToken && documents.length > 0  && 
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
                      </td>
                    </tr>
                    ))}
                </Table>
              </>
           }
           {!validToken && (
                <p style={{textAlign: "center"}}>Lien invalide ou expiré.</p>
           )}
        </div>
      </>
    );
  }
  
export default DocumentsVisiteur;