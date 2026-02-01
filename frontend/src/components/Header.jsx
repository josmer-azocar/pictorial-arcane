import './Header.css'



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
        </nav>
    </header>);
}

export default Header