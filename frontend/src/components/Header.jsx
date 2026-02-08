import './Header.css'
import { Link } from 'react-router-dom';



function Header(){
    
    return(
    <header>

        <h1 className="glow-text">
                <span>PICTORIAL</span> <span>ARCANE</span>
            </h1>

        <nav className="navigation">
            <li className="list-item"><Link to="/">Home</Link></li>
            <li className="list-item"><Link to="#">Acerca de</Link></li>
            <li className="list-item"><Link to="/artwork">Galería</Link></li>
            <li className="list-item"><Link to="#">Artistas</Link></li>
            <li className="list-item"><Link to="#">Envíos</Link></li>
            <li className="list-item"><Link to="/auth">Ingreso</Link></li>
        </nav>
    </header>);
}

export default Header