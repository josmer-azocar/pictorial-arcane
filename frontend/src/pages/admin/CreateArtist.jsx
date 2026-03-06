import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';
import './Form.css';

const BASE_URL = 'http://localhost:8080';

function CreateArtist() {
  const token = localStorage.getItem('token');

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    nationality: '',
    birth_date: '',
    biography: '',
    photo_url: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // POST /artists  — Requiere rol ADMIN
  const handleSubmit = async () => {
    if (!formData.first_name || !formData.last_name) {
      toast.error('Nombre y apellido son obligatorios.');
      return;
    }
    try {
      await axios.post(`${BASE_URL}/artists`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Artista creado correctamente.');
      setFormData({
        first_name: '', last_name: '', nationality: '',
        birth_date: '', biography: '', photo_url: '',
      });
    } catch (err) {
      toast.error('Error al crear el artista.');
    }
  };

  return (
    <div className="admin-section">
      <ToastContainer />
      <h1 className="section-title">Crear Nuevo Artista</h1>
      <div className="admin-line"></div>

      <div className="admin-form-container">
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input className="form-input" name="first_name"
            placeholder="Ej. Leonardo" value={formData.first_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Apellido</label>
          <input className="form-input" name="last_name"
            placeholder="Ej. Da Vinci" value={formData.last_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Nacionalidad</label>
          <input className="form-input" name="nationality"
            placeholder="Ej. Italiana" value={formData.nationality} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Fecha de Nacimiento</label>
          <input className="form-input" type="date" name="birth_date"
            value={formData.birth_date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">URL de Foto</label>
          <input className="form-input" name="photo_url"
            placeholder="https://ejemplo.com/foto.jpg" value={formData.photo_url} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-label">Biografía</label>
          <textarea className="form-input" name="biography" rows="5"
            placeholder="Escribe la biografía del artista..."
            value={formData.biography} onChange={handleChange} />
        </div>

        <div className="modal-actions">
          <button className="btn-primary" onClick={handleSubmit}>
            Crear Artista
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateArtist;