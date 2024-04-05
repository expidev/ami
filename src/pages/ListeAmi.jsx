import { useEffect, useState } from "react";
import Button from "../components/form/Button";
import Table from "../components/tableau/Table";
import Title from "../components/Title";
import style from "./ListeAmi.module.css";
import AmiApi from "../api/AmiApi";
import { useNavigate, useParams } from "react-router-dom";
import AmiMenu from "../components/AmiMenu";

const ListeAmi = () => {
    const [amiList, setAmiList] = useState([])
    const [totalPage, setTotalPage] = useState(0)
    const { page } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      const fetchAmiList = async () => {
          try {
              const newList = await AmiApi.getListByPage('/ami/page', page) || [];
              setAmiList(newList);
          } catch (err) {
              console.error("Error fetching AMI list:", err);
          }
      };
      
      fetchAmiList();
    }, [page]); 

    useEffect(() => {
      const countPage = async () => {
          try {
              const result = await AmiApi.countPage('/ami/');
              setTotalPage(Math.ceil(result.count / 10));
          } catch (err) {
              console.error("Error counting AMI list:", err);
          }
      };
      
      countPage();
    }, []); 

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
                {amiList.length > 0 && amiList.map((item) => (
                    <tr key={item.id_ami}>
                      <td>{item.id_ami}</td>
                      <td>
                        <Button
                          type="button"
                          value="DAO"
                          handleClick={() => {navigate(`/documents/${item.id_ami}`)}}
                        />
                        <Button
                          type="button"
                          value="Email"
                          handleClick={() => {navigate(`/superviseur/${item.id_ami}`)}}
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