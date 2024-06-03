import { useState } from "react";
import Titre from "../components/Title";
import Table from "../components/tableau/Table";
import style from "../components/StatisticsForm"
import StatisticsForm from "../components/StatisticsForm";
import DownloadsByDistrict from "../components/DownloadsByDistrict";


const data = [
    { label: 'District 1', value: 100 },
    { label: 'District 2', value: 600 },
    { label: 'District 3', value: 200 },
    { label: 'District 4', value: 50 },
];

const Statistics = () => {
    const [statistics, setStatistics] = useState({
        countTotal: "N/A",
        countEntreprise: "N/A",
        countIndividu: "N/A",
        districtData: []
    })
    const [trigger, setTrigger] = useState(false);

    return (
        <div>
            <Titre title="Statistiques" />

            <StatisticsForm 
                trigger={trigger}
                setStatistics={setStatistics}
                setTrigger={setTrigger}
            />

            <Table headers={["Téléchargement" ,"Quantité"]}>
                <tr>
                    <td>Total</td>
                    <td>{statistics.countTotal}</td>
                </tr>
                <tr>
                    <td>Individu</td>
                    <td>{statistics.countEntreprise}</td>
                </tr>
                <tr>
                    <td>Entreprise</td>
                    <td>{statistics.countIndividu}</td>
                </tr> 
            </Table>
            <DownloadsByDistrict data={statistics.districtData} />
        </div>
    )
}

export default Statistics;