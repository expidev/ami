import { NavLink, useNavigate } from 'react-router-dom'
import AuthService from '../helpers/AuthService'
import style from './Navigation.module.css'
import AdminApi from '../api/AdminApi'

import logo from '../assets/logo.png'

const Navigation = () => {

    const navigate = useNavigate()
    
    const handleLogout = async () => {
        try {
            await AdminApi.logout();
            AuthService.removeToken();
            navigate('/admin');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    return (
        <div className={style.navigationContainer}>
            <div>
                <img className={style.image} src={logo} alt="logo de FID" />
            </div>
            {AuthService.getToken('token') && (
                (
                    <>
                        <nav>
                        <ul className={style.navigation}>
                            <li className={style.link}><NavLink to="/ami/page/1">Accueil</NavLink></li>
                            <li className={style.link}><NavLink to="/statistiques">Statistiques</NavLink></li>
                            <li className={style.link}><NavLink to="#" onClick={handleLogout}>Déconnexion</NavLink></li>
                        </ul>
                        </nav>
                    </>
                )
            )}
        </div>
    )
}

export default Navigation
