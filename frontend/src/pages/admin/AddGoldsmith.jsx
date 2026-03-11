import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createGoldsmith, uploadArtworkImage } from '../../services/fetchArtwork.js';
import { useAuth } from '../../services/AuthContext';
import './AddArtwork.css';

const initialState = {
    name: '',
    status: 'AVAILABLE',
    price: '',
    material: '',
    preciousStones: '',
    weight: ''
};

const AddGoldsmith = () => {
    const { token } = useAuth();
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!imageFile) {
            const msg = "Por favor, selecciona un archivo de imagen.";
            setError(msg);
            toast.error(msg);
            return;
        }

        setIsLoading(true);
        let newArtworkId = null;

        try {
            const goldsmithData = {
                ...formData,
                price: parseFloat(formData.price),
                weight: parseFloat(formData.weight)
            };

            const createdResponse = await createGoldsmith(goldsmithData, token);
            
            // Asumimos que responde con idArtWork según la descripción
            newArtworkId = createdResponse.idArtWork;

            if (!newArtworkId) {
                throw new Error("La respuesta del servidor no contenía el ID de la obra.");
            }

            // Subir la imagen
            await uploadArtworkImage(newArtworkId, imageFile, token);

            toast.success('¡Orfebrería y su imagen han sido registradas con éxito!');
            setFormData(initialState);
            setImageFile(null);
            if (document.getElementById('image-upload')) {
                document.getElementById('image-upload').value = '';
            }

        } catch (err) {
            let finalErrorMessage;
            const serverMessage = err.response?.data?.message || err.message;

            if (newArtworkId) {
                finalErrorMessage = `La obra se creó (ID: ${newArtworkId}), pero falló la subida de la imagen. Error: ${serverMessage}`;
                toast.warning('La obra se creó pero la imagen no se pudo subir. Intente editar la obra.');
            } else {
                finalErrorMessage = `Error al crear la orfebrería: ${serverMessage}`;
                toast.error(finalErrorMessage);
            }
            setError(finalErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer position="top-center" autoClose={5000} theme="dark" />
            <h2 className="section-title">Nueva Orfebrería</h2>
            <p className="admin-subtitle">Detalles específicos para joyas y metales (quilates, tipo de metal, piedras).</p>

            <form className="admin-form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}

                <div className="form-group"><label className="form-label">Título de la Obra</label><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Collar de Zafiros" required /></div>
                <div className="form-group"><label className="form-label">Archivo de la Imagen</label><input id="image-upload" type="file" name="artworkImage" accept="image/*" onChange={handleImageChange} required /></div>

                <div className="form-row"><div className="form-group"><label className="form-label">Precio ($)</label><input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" min="0" required /></div><div className="form-group"><label className="form-label">Estado</label><select name="status" value={formData.status} onChange={handleChange}><option value="AVAILABLE">Disponible</option><option value="RESERVED">Reservado</option></select></div></div>

                <div className="form-row"><div className="form-group"><label className="form-label">Material</label><input type="text" name="material" value={formData.material} onChange={handleChange} placeholder="Ej: Oro 18k, Plata 925" required /></div><div className="form-group"><label className="form-label">Peso (g)</label><input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="0.00" min="0" required /></div></div>

                <div className="form-group"><label className="form-label">Piedras Preciosas</label><input type="text" name="preciousStones" value={formData.preciousStones} onChange={handleChange} placeholder="Ej: Diamante, Rubí, Ninguna" required /></div>

                <button type="submit" className="admin-create-btn" disabled={isLoading}>{isLoading ? 'Registrando...' : 'Registrar Orfebrería'}</button>
            </form>
        </div>
    );
};

export default AddGoldsmith;