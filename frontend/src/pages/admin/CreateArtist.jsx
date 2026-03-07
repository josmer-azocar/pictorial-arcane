import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';
import './Form.css';
import { uploadArtistImage } from '../../services/fetchArtwork.js';

const BASE_URL = 'http://localhost:8080';

function CreateArtist() {
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    nationality: '',
    birthDate: '',
    biography: '',
    commissionRate: 0.05,
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // POST /artist/add  — Requiere rol ADMIN
  const handleSubmit = async () => {
    if (!imageFile) {
      toast.error('Por favor, selecciona una imagen.');
      return;
    }
    setIsLoading(true);
    try {
      // PASO A: Crear el artista
      const response = await axios.post(`${BASE_URL}/artist/add`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const newArtistId = response.data.idArtist; // Asumiendo que devuelve { idArtist: ... }

      // PASO B: Subir la imagen
      await uploadArtistImage(newArtistId, imageFile, token);

      toast.success('¡Artista e imagen registrados con éxito!');
      setFormData({
        name: '',
        lastName: '',
        nationality: '',
        birthDate: '',
        biography: '',
        commissionRate: 0.05,
      });
      setImageFile(null);
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || 'Error al crear el artista.');
      } else {
        toast.error('Error al crear el artista.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <ToastContainer />
     
     
      <div className="admin-form-container">
         <h1 className="section-title">Crear Nuevo Artista</h1>
          <div className="admin-line"></div>

        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input className="form-input" name="name"
            placeholder="Ej. Leonardo" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Apellido</label>
          <input className="form-input" name="lastName"
            placeholder="Ej. Da Vinci" value={formData.lastName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Nacionalidad</label>
          <input className="form-input" name="nationality"
            placeholder="Ej. Italiana" value={formData.nationality} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Fecha de Nacimiento</label>
          <input className="form-input" type="date" name="birthDate"
            value={formData.birthDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Biografía</label>
          <textarea className="form-input" name="biography" rows="5"
            placeholder="Escribe la biografía del artista..."
            value={formData.biography} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Comisión (%)</label>
          <input
            type="number"
            name="commissionRate"
            className="form-input"
            value={(formData.commissionRate * 100).toFixed(2)}
            onChange={(e) => setFormData({ ...formData, commissionRate: parseFloat(e.target.value) / 100 })}
            step="0.01"
            min="5"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Foto del Artista</label>
          <label
            htmlFor="artist-image-upload"
            className={`image-upload-area ${imageFile ? 'has-file' : ''}`}
          >
            {imageFile ? (
              <>
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="preview"
                  className="image-upload-preview"
                />
                <span className="image-upload-filename">{imageFile.name}</span>
                <span className="image-upload-subtitle">Haz clic para cambiar</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="image-upload-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 
                    2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 
                    4.5M12 3v13.5" />
                </svg>
                <span className="image-upload-title">Haz clic para subir una foto</span>
                <span className="image-upload-subtitle">PNG, JPG, WEBP — máx. 5MB</span>
              </>
            )}
          </label>
          <input
            id="artist-image-upload"
            type="file"
            accept="image/*"
            className="image-upload-input"
            onChange={handleImageChange}
          />
        </div>

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Registrando...' : 'Crear Artista'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateArtist;