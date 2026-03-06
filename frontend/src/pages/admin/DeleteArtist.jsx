import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Admin.css';

const BASE_URL = 'http://localhost:8080';

function DeleteArtist() {
  const token = localStorage.getItem('token');
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET /artists — trae todos los artistas
  useEffect(() => {
    const fetchArtists = async () => {
      try {
       const res = await axios.get(`${BASE_URL}/artist/all`);
        setArtists(res.data);
      } catch (err) {
        toast.error('Error al cargar artistas.');
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  // DELETE /artists/{id}
  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Eliminar a ${name}? Esta acción no se puede deshacer.`)) return;
    try {
      await axios.delete(`${BASE_URL}/artists/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Artista "${name}" eliminado correctamente.`);
      setArtists(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      toast.error('No se pudo eliminar el artista.');
    }
  };

  return (
    <div className="admin-section">
      <ToastContainer />
      <h1 className="section-title">Borrar Artista</h1>
      <div className="admin-line"></div>

      {loading ? (
        <div className="empty-state">Cargando artistas...</div>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Nacionalidad</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {artists.map(a => (
                <tr key={a.id}>
                  <td className="td-id">#{a.id}</td>
                  <td className="td-artwork">{a.first_name} {a.last_name}</td>
                  <td>{a.nationality}</td>
                  <td>
                    <button className="btn-cancel"
                      style={{ color: '#f87171', borderColor: '#7f1d1d' }}
                      onClick={() => handleDelete(a.id, `${a.first_name} ${a.last_name}`)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {artists.length === 0 && (
                <tr>
                  <td colSpan="4" className="empty-state">No hay artistas registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DeleteArtist;