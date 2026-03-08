import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showArtwork, searchArtworks, showArtist } from '../../services/fetchArtwork';
import './Admin.css';

const UpdateArtwork = ({ onEditSelect }) => {
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ id: '', artistId: '', genre: '' });

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        const response = await showArtwork(0);
        setArtworks(response.content);

        // Cargar artistas para el filtro
        const artistsData = await showArtist();
        setArtists(artistsData);
      } catch (err) {
        toast.error('Error al cargar las obras.');
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await searchArtworks(filters);
      setArtworks(response.content || []);
      if (response.content.length === 0) {
        toast.info("No se encontraron obras con esos filtros.");
      }
    } catch (err) {
      toast.error('Error al buscar obras.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setFilters({ id: '', artistId: '', genre: '' });
    setLoading(true);
    try {
      const response = await showArtwork(0);
      setArtworks(response.content);
    } catch (err) {
      toast.error('Error al recargar las obras.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (artworkId) => {
    // Llama a la función pasada por props para notificar al componente padre (Admin.jsx)
    // que se ha seleccionado una obra para editar.
    onEditSelect(artworkId);
  };

  return (
    <div className="admin-section">
      <ToastContainer position="top-center" theme="dark" />
      <h1 className="section-title">Actualizar Obra</h1>
      <div className="admin-line"></div>
      <p className="admin-subtitle">
        Selecciona la obra que deseas editar.
      </p>

      {/* Barra de Filtros */}
      <form className="admin-form" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: '15px', maxWidth: '100%', marginTop: '20px', marginBottom: '30px' }} onSubmit={handleSearch}>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <input type="number" name="id" placeholder="Buscar por ID de Obra" value={filters.id} onChange={handleFilterChange} style={{ margin: 0 }} />
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <select name="artistId" value={filters.artistId} onChange={handleFilterChange} style={{ margin: 0 }}>
            <option value="">Filtrar por Artista</option>
            {artists.map(artist => (
              <option key={artist.id} value={artist.id}>{artist.name}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <input type="text" name="genre" placeholder="Filtrar por Género" value={filters.genre} onChange={handleFilterChange} style={{ margin: 0 }} />
        </div>
        <button type="submit" className="btn-primary" style={{ height: '50px', marginTop: '0' }} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
        <button type="button" className="btn-secondary" onClick={handleClear} style={{ height: '50px', marginTop: '0' }} disabled={loading}>
          Limpiar
        </button>
      </form>

      {loading ? (
        <div className="empty-state">Cargando obras...</div>
      ) : (
        <div className="table-wrapper" style={{ marginTop: '40px' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Obra</th>
                <th>Género</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {artworks.map(art => (
                <tr key={art.id}>
                  <td className="td-id">#{art.id}</td>
                  <td className="td-artwork">{art.name}</td>
                  <td>{art.genre}</td>
                  <td className="td-price">${art.precio?.toLocaleString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-invoice" onClick={() => handleEdit(art.id)}>Seleccionar para Editar</button>
                    </div>
                  </td>
                </tr>
              ))}
              {artworks.length === 0 && (
                <tr><td colSpan="5" className="empty-state">No hay obras registradas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UpdateArtwork;
