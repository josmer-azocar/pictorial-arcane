import './Header.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import './AdminHeader.css' 

function Header(){
    const { user, isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Si es ADMIN, mostrar el header de admin
    if (isLoggedIn && user?.role === 'ADMIN') {
        return (
            <header className="admin-header">
                <div className="admin-header-logo" onClick={() => navigate("/admin")}>
                    PICTORIAL <span>ARCANE</span>
                </div>
                <div className="admin-header-center">
                    <span className="admin-header-badge">
                        <span className="admin-header-dot"></span>
                        Panel de Administración
                    </span>
                </div>
                <div className="admin-header-right">
                    <span className="admin-header-name">
                        Hola, <strong>Administrador</strong>
                    </span>
                    <button className="admin-header-logout" onClick={handleLogout}>
                        Cerrar sesión
                    </button>
                </div>
            </header>
        );
    }

    // Si es cliente o no está logueado, mostrar el header normal
    return (
        <header>
            <h1 className="glow-text">
                <span>PICTORIAL</span> <span>ARCANE</span>
            </h1>
            <nav className="navigation">
                <li className="list-item"><Link to="/">Home</Link></li>
                <li className="list-item"><Link to="/about">Acerca de</Link></li>
                <li className="list-item"><Link to="/artwork">Galería</Link></li>
                <li className="list-item"><Link to="/shipment">Envíos</Link></li>
                {!isLoggedIn ? (
                    <li className="list-item">
                        <Link to="/login" className="login-btn">Login</Link>
                    </li>
                ) : (
                    <>
                        <li className="list-item">
                            <Link to="/dashboard" className="login-btn">Cuenta</Link>
                        </li>
                        <li className="list-item">
                            <button onClick={handleLogout} className="login-btn">
                                Salir
                            </button>
                        </li>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;