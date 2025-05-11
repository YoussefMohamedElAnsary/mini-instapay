import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const { token } = useContext(AuthContext)
    
    if (token) {
        return <Outlet />
    }
    
    return <Navigate to="/welcome" replace />
}

export default PrivateRoute
