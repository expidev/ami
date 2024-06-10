import { useEffect, useState } from "react";
import Title from "../components/Title";
import Table from "../components/tableau/Table";
import style from "./ModificationDAO.module.css";
import DocumentApi from "../api/DocumentApi";
import AmiApi from "../api/AmiApi";
import { useParams } from "react-router-dom";
import TokenApi from "../api/TokenApi";
import SimpleButton from "../components/form/SimpleButton";

const DocumentsVisiteur = () => {
  const [documents, setDocuments] = useState([]);
  const [ami, setAmi] = useState({});
  const { ref_ami, token } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await TokenApi.getCheckToken(token);
        if (response.token) {
          setValidToken(true);
          const newDocuments = await DocumentApi.getUserDocumentByAmi(ref_ami, token);
          setDocuments(newDocuments);
          await handleDownloadZip(ref_ami);
        }
      } catch (err) {
        console.log("Error in fetchData:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const handleDownloadZip = async (ref_ami) => {
      try {
        const response = await DocumentApi.downloadZip(ref_ami);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'dossier.zip');
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.log("Error", err.message);
      }
    };

    fetchData();
  }, [ref_ami, token]);

  useEffect(() => {
    const getAmiById = async () => {
      try {
        const newAmi = await AmiApi.getAmiByRef(ref_ami);
        setAmi(newAmi);
      } catch (err) {
        console.log("Error in getAmiById:", err.message);
      }
    };

    getAmiById();
  }, [ref_ami]);

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
      console.log("Error in handleDownloadDocument:", err.message);
    }
  };

  return (
    <>
      <Title title={`Liste des documents pour l'Appel d'Offre ${ref_ami}`} />
      <div className={style.container}>
        {isLoading && <p style={{ textAlign: "center" }}>Loading ...</p>}
        <div className={style.description}>
          <h2 className={style.subtitle}>Description</h2>
          <p>{ami.description ? ami.description : "Pas de description."}</p>
        </div>
        {validToken && documents.length > 0 && (
          <>
            <Table headers={["Intitulé", "Action"]}>
              {documents.map((item) => (
                <tr key={item.id_fichier}>
                  <td>{item.nom_fichier}</td>
                  <td>
                    <SimpleButton
                      value="Télécharger"
                      handleClick={() => handleDownloadDocument(item.type_fichier, item.nom_fichier)}
                    />
                  </td>
                </tr>
              ))}
            </Table>
          </>
        )}
        {!validToken && <p style={{ textAlign: "center" }}>Lien invalide ou expiré.</p>}
      </div>
    </>
  );
};

export default DocumentsVisiteur;
