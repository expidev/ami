import Titre from "../components/Titre";

import style from "./ListeDocuments.module.css";

const ListeDocuments = () => {

    return (
      <div>
        <Titre title="Liste des documents pour l'AMI N° 231321212"/>
        <table className={style.table}>
          <thead>
            <th>Intitulé</th>
            <th>Action</th>
          </thead>
          <tbody>
            <tr>
              <td>votre-offre.docx</td>
              <td>
                <button>Télécharger</button>
                <button>Supprimer</button>
              </td>
            </tr>
            <tr>
              <td>facture-proforma.xlsx</td>
              <td>
                <button>Télécharger</button>
                <button>Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  
export default ListeDocuments;