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
    commissionRate: 0.08,
    birthdate: '',
    imageUrl: ''
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
  // PASO 1: Cargar todos los artistas al montar
  /* useEffect(() => {
    const fetchArtists = async () => {
      try {
        // DATOS FALSOS TEMPORALES — borrar cuando el backend esté listo
        const mockArtists = [
          {
            idArtist: 1,
            name: 'Leonardo',
            lastName: 'Da Vinci',
            nationality: 'Italiana',
            birthdate: '1452-04-15',
            biography: 'Pintor, escultor e inventor del Renacimiento italiano.',
            commissionRate: 0.08,
            imageUrl: ''
          },
          {
            idArtist: 2,
            name: 'Pablo',
            lastName: 'Picasso',
            nationality: 'Española',
            birthdate: '1881-10-25',
            biography: 'Cofundador del cubismo y figura clave del arte moderno.',
            commissionRate: 0.10,
            imageUrl: ''
          },
          {
            idArtist: 3,
            name: 'Frida',
            lastName: 'Kahlo',
            nationality: 'Mexicana',
            birthdate: '1907-07-06',
            biography: 'Conocida por sus autorretratos inspirados en la naturaleza de México.',
            commissionRate: 0.07,
            imageUrl: ''
          },
        ];
        setArtists(mockArtists);
        /* — descomentar para usar backend real:
        const res = await axios.get(`${BASE_URL}/artist/all`);
        setArtists(res.data);
        */
  /*    } catch (err) {
        if (!err.response) {
          console.error('[UpdateArtist] Sin conexión con el backend:', err.message);
          toast.error('No se pudo conectar con el servidor.');
        } else {
          const msg = err.response?.data?.message || 'Error al cargar artistas.';
          toast.error(msg);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);*/

       
  // PASO 2: Seleccionar artista para editar
  const handleSelectArtist = (artist) => {
    setSelectedArtist(artist);
    setFormData({
      name: artist.name,
      lastName: artist.lastName,
      nationality: artist.nationality,
      biography: artist.biography,
      commissionRate: artist.commissionRate,
      birthdate: artist.birthdate,
      imageUrl: artist.imageUrl || ''
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
      commissionRate: 0.08,
      birthdate: '',
      imageUrl: ''
    });
  };

  // PASO 4: Enviar actualización
  const handleSubmit = async () => {
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

      {/* Formulario de edición — modal flotante */}
      {selectedArtist && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}
          onClick={handleCancel}
        >
          <div className="admin-form-container"
            style={{ maxWidth: '500px', width: '90%', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '70px', height: '70px',
              borderRadius: '50%',
              border: '3px solid #7c3aed',
              overflow: 'hidden',
              flexShrink: 0,
              background: '#1a0a2e',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {selectedArtist.imageUrl ? (
                <img src={selectedArtist.imageUrl} alt={selectedArtist.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                  fill="none" viewBox="0 0 24 24" stroke="#7c3aed" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 
                    0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 
                    0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              )}
            </div>
            <div>
              <h2 className="section-title" style={{ fontSize: '1.1rem', marginBottom: '4px' }}>
                Editando a: {selectedArtist.name} {selectedArtist.lastName}
              </h2>
              <span className="form-label">ID: #{selectedArtist.idArtist}</span>
            </div>
          </div>
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
              <label className="form-label">Fecha de Nacimiento</label>
              <input
                type="date"
                name="birthdate"
                className="form-input"
                value={formData.birthdate || ''}
                onChange={handleChange}
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
        </div>
      )}
    </div>
  );
}

export default UpdateArtist;