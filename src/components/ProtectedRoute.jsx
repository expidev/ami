import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import AuthService from '../helpers/AuthService'
import style from './ProtectedRoute.module.css'
import AdminApi from '../api/AdminApi'

const PrivateRoutes = () => {

    const navigate = useNavigate()
    
    const handleLogout = async () => {
        try {
            await AdminApi.logout();
            AuthService.removeToken();
            navigate('/signin');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <>
            {AuthService.getToken('token') ? 
                (
                    <>
                        <nav>
                        <ul className={style.navigation}>
                            <li className={style.link}><NavLink to="/ami/1">Accueil</NavLink></li>
                            <li className={style.link}><NavLink to="#" onClick={handleLogout}>Déconnexion</NavLink></li>
                        </ul>
                        </nav>
                        <Outlet/> 
                    </>
                )
                : <Navigate to="/signin"/>}
        </>
    )
}

export default PrivateRoutes
