import style from "./AmiMenu.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AmiApi from "../api/AmiApi";
import SimpleButton from "./form/SimpleButton";

const AmiMenu = ({page, totalPage, setAmiList}) => {
    const [ search , setSearch ] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const responseData = await AmiApi.searchAmiByRef(search);
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
                    <SimpleButton
                        value="Nouveau DAO"
                        handleClick={(e) => navigate('/ajout')}
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
                <li className={style.prevNextButton}>
                    <SimpleButton
                        value="Précédent"
                        handleClick={(e) => navigate(`/ami/${Number(page) - 1}`)}
                        disabled={page == 1 ? true: false}
                    />
                    <SimpleButton
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