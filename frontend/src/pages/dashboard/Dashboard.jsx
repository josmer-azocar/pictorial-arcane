import './Dashboard.css'
import { useAuth } from '../../services/authContext';
import { Link } from 'react-router-dom';

function Dashboard() {
    const { user } = useAuth();
    return(

        <section className='user-welcome'>
            <div id='pfp-moment'>
                <img src={user?.pfp} alt="profile pic"/>
                <div id='user-info'>
                <ul>
                    <li><Link to="/dashboard">Historial de Compras</Link></li>
                    <li><Link to="/dashboard">Información de Usuario</Link></li>
                    <li><Link to="/dashboard">Salir</Link></li>
                </ul>
            </div>
            </div>
            <p>Bienvenid@ {user?.name}</p>          
        </section>
        
    );
    
}
export default Dashboard