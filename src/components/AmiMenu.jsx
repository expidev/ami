import Button from "./form/Button";

import style from "./AmiMenu.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AmiApi from "../api/AmiApi";

const AmiMenu = ({setAmiList}) => {
    const [ search , setSearch ] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const responseData = await AmiApi.getAmiById(search);
            setAmiList(responseData)
        }
        catch(err) {
            console.log(err.message)
        }
    }

    return (
        <div className={style.container}>
            <ul className={style.menuContainer}>
                <li>
                    <Button
                        type="button"
                        value="Nouveau DAO"
                        handleClick={(e) => navigate('/documents')}
                    />
                </li>
                <li>
                    <form
                        onSubmit={handleSearch}
                    >
                        <input 
                            type="search" 
                            name="search" 
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <input type="submit" value="search"/>
                    </form>
                </li>
                <li>
                    <Button
                        type="button"
                        value="Précédent"
                    />
                    <Button
                        type="button"
                        value="Suivant"
                    />
                </li>

            </ul>
        </div>
    )
}

export default AmiMenu;