import { useState } from "react";
import Titre from "../components/Title";
import Table from "../components/tableau/Table";
import style from "./Statistics.module.css";
import StatisticsForm from "../components/StatisticsForm";
import DownloadsByRegion from "../components/DownloadsByRegion";

const Statistics = () => {
    const [statistics, setStatistics] = useState({
        countTotal: "N/A",
        countEntreprise: "N/A",
        countIndividu: "N/A",
        regionsData: []
    })
    const [trigger, setTrigger] = useState(false);
    
    return (
        <div>
            <Titre title="Nombre de Téléchargement" />

            <div className={style.container}>
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
                <DownloadsByRegion data={statistics.regionsData} />
            </div>

        </div>
    )
}

export default Statistics;