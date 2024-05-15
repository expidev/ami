import Titre from "../components/Title";
import InputTexte from "../components/form/InputTexte";
import Label from "../components/form/Label";
import Table from "../components/tableau/Table";

const Dashboard = () => {
    return (
        <div>
            <Titre title="Statistiques" />

            <div>
                <Label value="Top téléchargement" />
                <InputTexte type="number" />
                <Label value="Intervalle de Temps" />
                <InputTexte type="date" />
                <InputTexte type="date" />
            </div>

            <Table headers={["Libellé" ,"Quantité"]}>
                <tr>
                    <td>Globale</td>
                    <td>152</td>
                </tr>
                <tr>
                    <td>Ref EFE/2012</td>
                    <td>12</td>
                </tr>
                <tr>
                    <td>Ref EFE/2015</td>
                    <td>26</td>
                </tr>              
            </Table>
        </div>
    )
}

export default Dashboard;