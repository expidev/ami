import Titre from "../components/Titre";
import style from "./ListeAmi.module.css";

const ListeAmi = () => {

    return (
      <>
        <Titre title="Liste des AMIs"/>

        <div className={style.container}>
          <table className={style.table}>
            <tbody>
              <tr>
                <th>N° AMI</th>
                <th>Liste des fichiers</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>N° 45454545454541</td>
                <td>Liste dossier</td>
                <td>
                  <button>Modifier</button>
                </td>
              </tr>
              <tr>
                <td>N° 45454545454541</td>
                <td>Liste dossier</td>
                <td>
                  <button>Modifier</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
  
export default ListeAmi;