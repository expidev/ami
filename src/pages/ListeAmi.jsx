import Button from "../components/form/Button";
import Table from "../components/tableau/Table";
import Title from "../components/Title";
import style from "./ListeAmi.module.css";

const ListeAmi = () => {

    return (
      <>
        <Title title="Liste des AMIs"/>

        <div className={style.container}>
          <Table
              headers={["N° AMI", "Liste des fichiers", "Action"]}
          >
              <tr>
                <td>N° 45454545454541</td>
                <td>Liste dossier</td>
                <td>
                  <Button
                    type="button"
                    value="Gérer"
                    onClick={() => {}}
                  />
                </td>
              </tr>
              <tr>
                <td>N° 45454545454541</td>
                <td>Liste dossier</td>
                <td>
                  <Button
                      type="button"
                      value="Gérer"
                      onClick={() => {}}
                  />
                </td>
              </tr>
          </Table>
        </div>
      </>
    );
  }
  
export default ListeAmi;