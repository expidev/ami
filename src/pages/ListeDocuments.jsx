import { useEffect, useState } from "react";
import Title from "../components/Title";
import Button from "../components/form/Button";
import Table from "../components/tableau/Table";
import style from "./ListeDocuments.module.css";
import DocumentApi from "../api/DocumentApi";
import { useParams } from "react-router-dom";

const ListeDocuments = () => {

    const [documents, setDocuments] = useState([]);
    const {id_ami} = useParams();

    useEffect(() => {
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
    }, [])

    return (
      <>
        <Title title="Liste des documents pour l'AMI N° 231321212"/>
        <div className={style.container}>
          {documents.length > 0  && 
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
                      handleClick={() => {}}
                    />
                    <Button
                      value="Supprimer"
                      type="button"
                      handleClick={() => {}}
                    />
                  </td>
                </tr>
                ))}
             </Table>
           }
          
          {documents.length == 0  &&  (
                <p style={{textAlign: "center"}}>Pas de document.</p>
          )}
        </div>
      </>
    );
  }
  
export default ListeDocuments;