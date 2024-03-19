import Title from "../components/Title";
import Button from "../components/form/Button";
import Table from "../components/tableau/Table";
import style from "./ListeDocuments.module.css";

const ListeDocuments = () => {

    return (
      <>
        <Title title="Liste des documents pour l'AMI N° 231321212"/>
        <div className={style.container}>
          <Table
            headers={["Intitulé", "Description", "Action"]}
          >
              <tr>
                <td>votre-offre.docx</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, quam temporibus! Ipsam, voluptatibus consequatur. Fugiat labore, quos illo quae eveniet sequi quibusdam! Similique dolores, totam inventore maxime ad nesciunt voluptatum?</td>
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
              <tr>
                <td>facture-proforma.xlsx</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, quam temporibus! Ipsam, voluptatibus consequatur. Fugiat labore, quos illo quae eveniet sequi quibusdam! Similique dolores, totam inventore maxime ad nesciunt voluptatum?</td>
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
          </Table>
        </div>
      </>
    );
  }
  
export default ListeDocuments;