import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPainting, uploadArtworkImage } from '../../services/fetchArtwork.js';
import { useAuth } from '../../services/AuthContext';
import './AddArtwork.css';

const initialState = {
    name: '',
    status: 'AVAILABLE',
    price: '',
    technique: '',
    holder: '',
    style: '',
    framed: 'false', // Se maneja como string en el select y se convierte a boolean al enviar
    width: '',
    height: ''
};

const AddPainting = () => {
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
            // Preparar datos (convertir tipos si es necesario)
            const paintingData = {
                ...formData,
                price: parseFloat(formData.price),
                width: parseFloat(formData.width),
                height: parseFloat(formData.height),
                framed: formData.framed === 'true' // Convertir string a boolean
            };

            const createdResponse = await createPainting(paintingData, token);
            
            // Según tu indicación, la respuesta trae idArtWork directamente
            newArtworkId = createdResponse.idArtWork;

            if (!newArtworkId) {
                throw new Error("La respuesta del servidor no contenía el ID de la obra.");
            }

            // Subir la imagen
            await uploadArtworkImage(newArtworkId, imageFile, token);

            toast.success('¡Pintura y su imagen han sido registradas con éxito!');
            setFormData(initialState);
            setImageFile(null);
            if (document.getElementById('image-upload')) {
                document.getElementById('image-upload').value = '';
            }
        } catch (err) {
            let finalErrorMessage;
            const serverMessage = err.response?.data?.message || err.message;
            if (newArtworkId) {
                finalErrorMessage = `La pintura se creó (ID: ${newArtworkId}), pero falló la subida de la imagen. Error: ${serverMessage}`;
                toast.warning('La pintura se creó pero la imagen no se pudo subir. Intente editar la obra.');
            } else {
                finalErrorMessage = `Error al crear la pintura: ${serverMessage}`;
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
            <h2 className="section-title">Nueva Pintura</h2>
            <p className="admin-subtitle">Detalles específicos para pinturas (técnica, soporte, estilo...).</p>

            <form className="admin-form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}

                <div className="form-group"><label className="form-label">Título de la Obra</label><input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: La Noche Estrellada" required /></div>
                <div className="form-group"><label className="form-label">Archivo de la Imagen</label><input id="image-upload" type="file" name="artworkImage" accept="image/*" onChange={handleImageChange} required /></div>

                <div className="form-row"><div className="form-group"><label className="form-label">Precio ($)</label><input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" min="0" required /></div><div className="form-group"><label className="form-label">Estado</label><select name="status" value={formData.status} onChange={handleChange}><option value="AVAILABLE">Disponible</option><option value="RESERVED">Reservado</option></select></div></div>

                <div className="form-row"><div className="form-group"><label className="form-label">Técnica</label><input type="text" name="technique" value={formData.technique} onChange={handleChange} placeholder="Ej: Óleo, Acrílico, Acuarela" required /></div><div className="form-group"><label className="form-label">Estilo</label><input type="text" name="style" value={formData.style} onChange={handleChange} placeholder="Ej: Impresionismo, Abstracto" required /></div></div>

                <div className="form-row"><div className="form-group"><label className="form-label">Soporte (Holder)</label><input type="text" name="holder" value={formData.holder} onChange={handleChange} placeholder="Ej: Lienzo, Madera, Papel" required /></div><div className="form-group"><label className="form-label">¿Enmarcado?</label><select name="framed" value={formData.framed} onChange={handleChange}><option value="false">No</option><option value="true">Sí</option></select></div></div>

                <div className="form-row"><div className="form-group"><label className="form-label">Ancho (cm)</label><input type="number" name="width" value={formData.width} onChange={handleChange} placeholder="0.00" min="0" required /></div><div className="form-group"><label className="form-label">Alto (cm)</label><input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="0.00" min="0" required /></div></div>

                <button type="submit" className="admin-create-btn" disabled={isLoading}>{isLoading ? 'Registrando...' : 'Registrar Pintura'}</button>
            </form>
        </div>
    );
};

export default AddPainting;