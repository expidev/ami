import { useEffect, useState } from "react";
import Button from "../components/form/Button";
import Table from "../components/tableau/Table";
import Title from "../components/Title";
import style from "./ListeAmi.module.css";
import AmiApi from "../api/AmiApi";
import { useNavigate } from "react-router-dom";

const ListeAmi = () => {
    const [amiList, setAmiList] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
      const fetchAmiList = async () => {
          try {
              const newList = await AmiApi.getList('/ami') || [];
              setAmiList(newList);
          } catch (err) {
              console.error("Error fetching AMI list:", err);
          }
      };
      
      fetchAmiList();
    }, []); 


    return (
      <>
        <Title title="Liste des AMIs"/>

        <div className={style.container}>
          {amiList.length > 0 &&
            <Table
                headers={["N° AMI", "Nom de l' AMI", "Action"]}
            >
                {amiList.length > 0 && amiList.map((item) => (
                    <tr key={item.id_ami}>
                      <td>{item.id_ami}</td>
                      <td>{item.titre}</td>
                      <td>
                        <Button
                          type="button"
                          value="DAO"
                          handleClick={() => {navigate(`/documents`)}}
                        />
                      </td>
                    </tr>
                ))}
            </Table>
          }
          {
            amiList.length == 0 &&
            <p style={{textAlign: "center"}}>Aucune liste d'AMI.</p>
          }
        </div>
      </>
    );
  }
  
export default ListeAmi;