import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createPhotography, updatePhotography, uploadArtworkImage } from '../../services/fetchArtwork.js';
import { useAuth } from '../../services/AuthContext';
import './AddArtwork.css';

const initialState = {
    name: '',
    status: 'AVAILABLE',
    price: '',
    printType: '',
    resolution: '',
    color: '',
    serialNumber: '',
    camera: ''
};

const AddPhotography = ({ artworkData }) => {
    const { token } = useAuth();
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (artworkData) {
            setFormData({
                name: artworkData.name || '',
                status: artworkData.status || 'AVAILABLE',
                price: artworkData.price || artworkData.precio || '',
                printType: artworkData.printType || '',
                resolution: artworkData.resolution || '',
                color: artworkData.color || '',
                serialNumber: artworkData.serialNumber || '',
                camera: artworkData.camera || ''
            });
        }
    }, [artworkData]);


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

        if (!artworkData && !imageFile) {
            const msg = "Por favor, selecciona un archivo de imagen.";
            setError(msg);
            toast.error(msg);
            return;
        }

        setIsLoading(true);
        let newArtworkId = null;

        try {
            const photographyData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            if (artworkData) {
                await updatePhotography(artworkData.id, photographyData, token);
                newArtworkId = artworkData.id;
                toast.success('¡Fotografía actualizada con éxito!');
            } else {
                const createdResponse = await createPhotography(photographyData, token);
                newArtworkId = createdResponse?.artWork?.id;

                if (!newArtworkId) {
                    throw new Error("La respuesta del servidor no contenía el ID de la obra tras su creación.");
                }
                toast.success('¡Fotografía registrada con éxito!');
            }

            if (imageFile) {
                await uploadArtworkImage(newArtworkId, imageFile, token);
                if (artworkData) toast.info('Imagen actualizada.');
            }

            setFormData(initialState);
            setImageFile(null);
            if (document.getElementById('image-upload')) {
                document.getElementById('image-upload').value = '';
            }

        } catch (err) {
            let finalErrorMessage;
            const serverMessage = err.response?.data?.message || err.message;

            if (newArtworkId) {
                finalErrorMessage = `Operación exitosa (ID: ${newArtworkId}), pero falló la subida de la imagen. Error: ${serverMessage}`;
                toast.warning('Datos guardados, pero hubo un error con la imagen.');
            } else {
                finalErrorMessage = `Error al procesar la fotografía: ${serverMessage}`;
                toast.error(finalErrorMessage);
            }
            setError(finalErrorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
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
            <h2 className="section-title">{artworkData ? 'Editar Fotografía' : 'Nueva Fotografía'}</h2>
            <p className="admin-subtitle">{artworkData ? 'Modifica los detalles de la fotografía.' : 'Detalles específicos para fotografía (resolución, tipo de impresión, edición).'}</p>
            
            <form className="admin-form" onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <label className="form-label">Título de la Obra</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Ej: Atardecer Urbano" required={!artworkData} />
                </div>

                <div className="form-group">
                    <label className="form-label">Archivo de la Imagen {artworkData && '(Opcional)'}</label>
                    <input id="image-upload" type="file" name="artworkImage" accept="image/*" onChange={handleImageChange} required={!artworkData} />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Precio ($)</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" min="0" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Estado</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="AVAILABLE">Disponible</option>
                            <option value="RESERVED">Reservado</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group"><label className="form-label">Cámara</label><input type="text" name="camera" value={formData.camera} onChange={handleChange} placeholder="Ej: Canon EOS R5" required /></div>
                    <div className="form-group"><label className="form-label">Resolución</label><input type="text" name="resolution" value={formData.resolution} onChange={handleChange} placeholder="Ej: 300dpi, 4K" required /></div>
                </div>

                <div className="form-row">
                    <div className="form-group"><label className="form-label">Tipo de Impresión</label><input type="text" name="printType" value={formData.printType} onChange={handleChange} placeholder="Ej: Papel Fine Art" required /></div>
                    <div className="form-group"><label className="form-label">Color</label><input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Ej: B&N, Color" required /></div>
                </div>

                <div className="form-group"><label className="form-label">Número de Serie</label><input type="text" name="serialNumber" value={formData.serialNumber} onChange={handleChange} placeholder="Ej: 1/50" required /></div>

                <button type="submit" className="admin-create-btn" disabled={isLoading}>{isLoading ? 'Procesando...' : (artworkData ? 'Actualizar Fotografía' : 'Registrar Fotografía')}</button>
            </form>
        </div>
    );
};

export default AddPhotography;