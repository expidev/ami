import Button from "./form/Button";

import style from "./AmiMenu.module.css";
import { useNavigate } from "react-router-dom";

const AmiMenu = () => {
    const navigate = useNavigate();

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
                    <input type="search" name="" id="" />
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