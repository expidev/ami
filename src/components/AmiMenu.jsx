import Button from "./form/Button";

import style from "./AmiMenu.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AmiApi from "../api/AmiApi";

const AmiMenu = ({page, totalPage, setAmiList}) => {
    const [ search , setSearch ] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const responseData = await AmiApi.searchAmiById(search);
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
                            className={style.searchInput}
                            name="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <input 
                            className={style.searchButton}
                            type="submit" 
                            value="Search"
                        />
                    </form>
                </li>
                <li>
                    <Button
                        type="button"
                        value="Précédent"
                        handleClick={(e) => navigate(`/ami/${Number(page) - 1}`)}
                        disabled={page == 1 ? true: false}
                    />
                    <Button
                        type="button"
                        value="Suivant"
                        handleClick={(e) => navigate(`/ami/${Number(page) + 1}`)}
                        disabled={page == totalPage ? true: false}
                    />
                </li>

            </ul>
            <p>Page: {page}/{totalPage}</p>
        </div>
    )
}

export default AmiMenu;