import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';

const BASE_URL = 'http://localhost:8080';

function UpdateArtist() {
  const token = localStorage.getItem('token');
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    nationality: '',
    biography: '',
    commissionRate: 0.08
  });
  const [loading, setLoading] = useState(true);

  // PASO 1: Cargar todos los artistas al montar
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/artist/all`);
        setArtists(res.data);
      } catch (err) {
        if (!err.response) {
          console.error('[UpdateArtist] Sin conexión con el backend:', err.message);
          toast.error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
        } else if (err.response.status === 401) {
          console.error('[UpdateArtist] No autorizado:', err.response.status);
          toast.error('No autorizado. Tu sesión puede haber expirado.');
        } else if (err.response.status === 403) {
          console.error('[UpdateArtist] Forbidden:', err.response.status);
          toast.error('No tienes permisos para ver los artistas.');
        } else if (err.response.status === 500) {
          console.error('[UpdateArtist] Error del servidor:', err.response.status);
          toast.error('Error interno del servidor. Intenta más tarde.');
        } else {
          console.error('[UpdateArtist] Error inesperado:', err);
          const msg = err.response?.data?.message || 'Error al cargar artistas.';
          toast.error(msg);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  // PASO 2: Seleccionar artista para editar
  const handleSelectArtist = (artist) => {
    setSelectedArtist(artist);
    setFormData({
      name: artist.name,
      lastName: artist.lastName,
      nationality: artist.nationality,
      biography: artist.biography,
      commissionRate: artist.commissionRate
    });
  };

  // Manejar cambios en formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'commissionRate' ? (value === '' ? 0.08 : parseFloat(value) / 100) : value
    }));
  };

  // Cancelar edición
  const handleCancel = () => {
    setSelectedArtist(null);
    setFormData({
      name: '',
      lastName: '',
      nationality: '',
      biography: '',
      commissionRate: 0.08
    });
  };

  // PASO 4: Enviar actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.lastName || !formData.nationality || !formData.biography) {
      toast.error('Completa los campos obligatorios.');
      return;
    }
    try {
      await axios.put(`${BASE_URL}/artist/update/${selectedArtist.idArtist}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      toast.success('Artista actualizado correctamente.');
      // Actualizar el artista en la lista
      setArtists(prev => prev.map(a => a.idArtist === selectedArtist.idArtist ? { ...a, ...formData } : a));
      handleCancel(); // Limpiar
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al actualizar el artista.';
      toast.error(msg);
    }
  };

  return (
    <div className="admin-section">
      <ToastContainer />
      <h1 className="section-title">Actualizar Artista</h1>
      <div className="admin-line"></div>

      {/* Tabla de artistas */}
      {loading ? (
        <div className="empty-state">Cargando artistas...</div>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Nacionalidad</th>
                <th>Comisión</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {artists.map(a => (
                <tr key={a.idArtist}>
                  <td className="td-id">#{a.idArtist}</td>
                  <td>{a.name}</td>
                  <td>{a.lastName}</td>
                  <td>{a.nationality}</td>
                  <td>{(a.commissionRate * 100).toFixed(0)}%</td>
                  <td>
                    <button className="btn-primary" onClick={() => handleSelectArtist(a)}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
              {artists.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-state">No hay artistas registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Formulario de edición */}
      {selectedArtist && (
        <div className="admin-form-container" style={{ marginTop: '2rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.2rem' }}>
            Editando a: {selectedArtist.name} {selectedArtist.lastName}
          </h2>
          <div className="admin-line"></div>
          <div>
            <div className="form-group">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                name="lastName"
                className="form-input"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Nacionalidad</label>
              <input
                type="text"
                name="nationality"
                className="form-input"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Biografía</label>
              <textarea
                name="biography"
                className="form-input"
                rows="5"
                value={formData.biography}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Comisión (%)</label>
              <input
                type="number"
                name="commissionRate"
                className="form-input"
                value={(formData.commissionRate * 100).toFixed(2)}
                onChange={handleChange}
                step="0.01"
                min="5"
                max="10"
              />
            </div>
            <div className="modal-actions">
              <button type="button" className="btn-primary" onClick={handleSubmit}>Guardar Cambios</button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateArtist;