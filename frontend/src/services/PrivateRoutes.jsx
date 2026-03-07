import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Loading from '../components/Loading';

const PrivateRoutes = () => {
    const { isLoggedIn, loading } = useAuth();

    console.log("Checking Protection -> LoggedIn:", isLoggedIn, "Loading:", loading);

    if (loading) return <Loading />; // Important! Don't return null.

    return (
        isLoggedIn ? <Outlet /> : <Navigate to="/login" /> //si esta loggeado se envia a rutas hijas, sino a login
    )
}

export default PrivateRoutes;