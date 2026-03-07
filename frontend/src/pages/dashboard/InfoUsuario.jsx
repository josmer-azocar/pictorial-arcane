import './Dashboard.css'
import { useAuth } from '../../services/AuthContext';

function InfoUsuario(){
    const { user } = useAuth();
    return(
        <section>
            <h3>Información de Usuario</h3>
            <p>Nombre: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Género: {user?.gender}</p>
            <p>Código Postal: {user?.postal_code}</p>
            {console.log("debug")}
            {console.log(user)}
        </section>
    );
}

export default InfoUsuario