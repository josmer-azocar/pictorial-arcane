import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGenre } from '../../services/fetchArtwork';
import { useAuth } from '../../services/AuthContext';
import './Admin.css';

const CreateGenre = () => {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!formData.name || !formData.description) {
            const msg = 'Todos los campos son obligatorios.';
            setError(msg);
            toast.error(msg);
            setIsLoading(false);
            return;
        }

        try {
            await createGenre(formData, token);
            toast.success('¡Nuevo género creado con éxito!');
            setFormData({ name: '', description: '' }); // Reset form
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Ocurrió un error al crear el género.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="admin-form-container">
            <ToastContainer position="top-center" autoClose={5000} theme="dark" />
            <h1 className="section-title">Crear Nuevo Género</h1>
            <div className="admin-line"></div>
            <p className="admin-subtitle">
                Define un nuevo género o tipo de obra para clasificar el arte.
            </p>
            <form onSubmit={handleSubmit} className="admin-form">
                {error && <p className="error-message">{error}</p>}
                
                <div className="form-group">
                    <label className="form-label">Nombre del Género</label>
                    <input
                        type="text" name="name" placeholder="Ej: Escultura, Pintura..."
                        value={formData.name} onChange={handleChange} required
                    />
                </div>
                
                <div className="form-group">
                    <label className="form-label">Descripción</label>
                    <textarea
                        name="description" placeholder="Una breve descripción del género."
                        value={formData.description} onChange={handleChange} required
                        rows="4"
                        style={{resize: 'vertical'}}
                    />
                </div>

                <button type="submit" className="admin-create-btn" disabled={isLoading}>
                    {isLoading ? 'Creando...' : 'Crear Género'}
                </button>
            </form>
        </div>
    );
};

export default CreateGenre;