import {Navigate, Outlet} from 'react-router-dom'
import AuthService from '../helpers/AuthService'

const PrivateRoutes = () => {

    return (
        <>
            {AuthService.getToken('token') ? 
                (
                        <Outlet/> 
                )
                : <Navigate to="/admin"/>}
        </>
    )
}

export default PrivateRoutes
