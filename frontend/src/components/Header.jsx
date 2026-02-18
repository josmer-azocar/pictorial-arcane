import './Header.css'
import { Link } from 'react-router-dom';

function Header(){
    
    return(
    <header>

        <h1 className="glow-text">
                <span>PICTORIAL</span> <span>ARCANE</span>
            </h1>

        <nav className="navigation">
            <li className="list-item"><a href="#"> Home</a></li>
            <li className="list-item"><a href="#">Acerca de</a></li>
            <li className="list-item"><a href="#">Galería</a></li>
            <li className="list-item"><a href="#">Artistas</a></li>
            <li className="list-item"><a href="#">Envíos</a></li>
            {/* botón de Login */}
            <li className="list-item">
                <Link to="/login" className="login-btn">Login</Link>
            </li>
        </nav>
    </header>);
}

export default Header