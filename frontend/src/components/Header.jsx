import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';


function Header(){
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // redirect to home after logout
    };
    
    return(
    <header>

        <h1 className="glow-text">
                <span>PICTORIAL</span> <span>ARCANE</span>
            </h1>

        <nav className="navigation">
            <li className="list-item"><Link to="/">Home</Link></li>
            <li className="list-item"><Link to="/about">Acerca de</Link></li>
            <li className="list-item"><Link to="/artwork">Galería</Link></li>
            <li className="list-item"><Link to="#">Artistas</Link></li>
            <li className="list-item"><Link to="/shipment">Envíos</Link></li>
            {/* botón de Login */}
            {!isLoggedIn ? (
                    // Si el usuario no esta loggeado
                    <li className="list-item">
                        <Link to="/login" className="login-btn">Login</Link>
                    </li>
                ) : (
                    // Usuario loggeado
                    <>
                        {user?.role === 'ADMIN' ? (
                            <li className="list-item">
                                <Link to="/admin" className="login-btn">Panel</Link>
                            </li>
                        ) : (
                            <li className="list-item">
                                <Link to="/dashboard" className="login-btn">Cuenta</Link>
                            </li>
                        )}
                        <li className="list-item">
                            <button onClick={handleLogout} className="login-btn">
                                Salir
                            </button>
                        </li>
                    </>
                )}
        </nav>
    </header>);
}

export default Header