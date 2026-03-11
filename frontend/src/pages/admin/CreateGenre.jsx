import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGenre } from '../../services/fetchArtwork.js';
import { useAuth } from '../../services/AuthContext';
import './Admin.css';

const CreateGenre = () => {
    const { token } = useAuth();
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!description.trim()) {
            const msg = "La descripción del género no puede estar vacía.";
            setError(msg);
            toast.error(msg);
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Pasar el token real
            await createGenre({ description }, token);
            toast.success(`¡Género "${description}" creado con éxito!`);
            setDescription(''); // Limpiar el campo
        } catch (err) {
            const serverMessage = err.response?.data?.message || err.message;
            const finalErrorMessage = `Error al crear el género: ${serverMessage}`;
            setError(finalErrorMessage);
            toast.error(finalErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-form-container">
            <ToastContainer position="top-center" autoClose={5000} theme="dark" />
            <h1 className="admin-title">Crear Nuevo Género</h1>
            <div className="admin-line"></div>
            <p className="admin-subtitle">
                Añade una nueva categoría o estilo para clasificar las obras de arte.
            </p>
            <form onSubmit={handleSubmit} className="admin-form">
                {error && <p className="error-message">{error}</p>}
                
                <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label className="form-label">Descripción del Género</label>
                    <input type="text" name="description" placeholder="Ej: Cubismo, Arte Abstracto..." value={description} onChange={(e) => setDescription(e.target.value)} required />
                </div>

                <button type="submit" className="admin-create-btn" disabled={isLoading}>{isLoading ? 'Creando...' : 'Crear Género'}</button>
            </form>
        </div>
    );
};

export default CreateGenre;