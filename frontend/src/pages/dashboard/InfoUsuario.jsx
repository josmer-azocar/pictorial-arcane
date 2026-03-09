import './Dashboard.css'
import { useAuth } from '../../services/AuthContext.jsx';
import { useState } from 'react';
import { updateUserData } from '../../services/userServices.js';

function InfoUsuario(){
    const { user, login, client } = useAuth();
    const [ isEditing, setIsEditing] = useState(false);

    const RenderEditing = () => {
        return (
            <form className="edit-form">
                <div className='form-cont'>
                    <label htmlFor='gender'>Género:</label>
                    <select name='gender' id='gender' defaultValue={user?.gender}>
                        <option value='FEMALE'>Mujer</option>
                        <option value='MALE'>Hombre</option>
                        <option value='OTHER'>Otro</option>
                    </select>

                    <label htmlFor='postal'>Código Postal:</label>
                    <input type="number" id='postal' defaultValue={client?.postalCode} min="1" max="9999999"/>
                </div>
                <div className="form-buttons">
                    <button type='submit'>Actualizar datos</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            </form>
        );
    }
    return(
        <section>
            <h3>Información de Usuario</h3>
            {isEditing ? (
                <RenderEditing />
            ) : (
                <div className="info-display">
                    <p><strong>Nombre:</strong> {user?.firstName}</p>
                    <p><strong>Apellido:</strong> {user?.lastName}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Género:</strong> {user?.gender || "No especificado"}</p>
                    <p><strong>Código Postal:</strong> {client?.postalCode || "N/A"}</p>

                    <button onClick={() => setIsEditing(true)}>
                        Editar
                    </button>
                </div>
            )}
        </section>
    );
}

export default InfoUsuario