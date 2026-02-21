import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

const PrivateRoutes = () => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) return null;

    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" /> //si esta loggeado se envia a rutas hijas, sino a login
    )
}

export default PrivateRoutes;