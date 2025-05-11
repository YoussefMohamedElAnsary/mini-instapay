import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const { token } = useContext(UserContext)
    
    if (token) {
        return <Outlet />
    }
    
    return <Navigate to="/welcome" replace />
}

export default PrivateRoute
