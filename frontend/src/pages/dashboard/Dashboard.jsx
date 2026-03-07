import './Dashboard.css'
import { useAuth } from '../../services/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import HistorialCompras from './HistorialCompras';
import InfoUsuario from './InfoUsuario';

function Dashboard() {
    const { user, logout } = useAuth();
    const [activeSection, setActiveSection] = useState('welcome');

    const renderContent = () => {
        switch (activeSection) {
            case 'history':
                return <div><h3>Tu Historial de Compras</h3><HistorialCompras/></div>;
            case 'info':
                return (
                    <div>
                        <InfoUsuario/>
                    </div>
                );
            default:
                return <p>Bienvenid@ {user?.name}</p>;
        }
    };

    return(
        

        <section className='user-welcome'>
            <div id='pfp-moment'>
                <img src={user?.pfp} alt="profile pic"/>
                <div id='user-info'>
                <ul>
                    <li>
                        <button onClick={() => setActiveSection('history')}>Historial de Compras</button>
                    </li>
                    <li>
                        <button onClick={() => setActiveSection('info')}>Información de Usuario</button>
                    </li>
                    <li><button onClick={logout}>Salir</button></li>
                </ul>
            </div>
            </div>
            <div id='message-user'>
                {renderContent()}  
            </div>
                    
        </section>
        
    );
    
}
export default Dashboard