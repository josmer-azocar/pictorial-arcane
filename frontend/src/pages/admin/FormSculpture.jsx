import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSculpture } from '../../services/fetchArtwork';
import { useAuth } from '../../services/AuthContext';
import './Form.css';

const initialState = {
    name: '',
    imageUrl: '',
    status: 'DISPONIBLE',
    price: '',
    material: '',
    weight: '',
    length: '',
    width: '',
    depth: ''
};

const FormSculpture = () => {
    const { token } = useAuth();
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const dataToSend = {
            ...formData,
            price: parseFloat(formData.price),
            weight: parseFloat(formData.weight),
            length: parseFloat(formData.length),
            width: parseFloat(formData.width),
            depth: parseFloat(formData.depth),
        };

        try {
            await createSculpture(dataToSend, token);
            toast.success('¡Escultura creada con éxito!');
            setFormData(initialState);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error al crear la escultura.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* El contenedor de notificaciones se puede mover a un layout superior si se prefiere */}
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <h2 className="section-title">Nueva Escultura</h2>
            <p className="admin-subtitle">Detalles específicos para esculturas (peso, material, dimensiones 3D).</p>
            
            <form className="admin-form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}

                {/* Nombre de la obra */}
                <div className="form-group">
                    <label className="form-label">Título de la Obra</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Ej: El Pensador Eterno" 
                        required 
                    />
                </div>

                {/* URL de la Imagen */}
                <div className="form-group">
                    <label className="form-label">URL de la Imagen</label>
                    <input 
                        type="url" 
                        name="imageUrl" 
                        value={formData.imageUrl} 
                        onChange={handleChange} 
                        placeholder="https://ejemplo.com/imagen.jpg"
                    />
                </div>

                <div className="form-row">
                    {/* Precio */}
                    <div className="form-group">
                        <label className="form-label">Precio ($)</label>
                        <input 
                            type="number" 
                            name="price" 
                            value={formData.price} 
                            onChange={handleChange} 
                            placeholder="0.00" 
                            min="0"
                            required 
                        />
                    </div>

                    {/* Estado */}
                    <div className="form-group">
                        <label className="form-label">Estado</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="DISPONIBLE">Disponible</option>
                            <option value="RESERVADO">Reservado</option>
                            <option value="VENDIDO">Vendido</option>
                        </select>
                    </div>
                </div>

                {/* Material y Peso */}
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Material</label>
                        <input type="text" name="material" value={formData.material} onChange={handleChange} placeholder="Ej: Mármol, Bronce..." required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Peso (kg)</label>
                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="0" min="0" required />
                    </div>
                </div>

                {/* Dimensiones */}
                <label className="form-label" style={{marginTop: '10px'}}>Dimensiones (cm)</label>
                <div className="form-row">
                    <div className="form-group">
                        <input type="number" name="length" value={formData.length} onChange={handleChange} placeholder="Largo" min="0" required />
                    </div>
                    <div className="form-group">
                        <input type="number" name="width" value={formData.width} onChange={handleChange} placeholder="Ancho" min="0" required />
                    </div>
                    <div className="form-group">
                        <input type="number" name="depth" value={formData.depth} onChange={handleChange} placeholder="Profundidad" min="0" required />
                    </div>
                </div>

                <button type="submit" className="admin-create-btn" disabled={isLoading}>
                    {isLoading ? 'Registrando...' : 'Registrar Escultura'}
                </button>
            </form>
        </div>
    );
};

export default FormSculpture;