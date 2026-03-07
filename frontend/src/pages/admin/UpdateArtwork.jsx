import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showArtwork } from '../../services/fetchArtwork';
import './Admin.css';

const UpdateArtwork = ({ onEditSelect }) => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        // Usamos la función existente que por ahora devuelve datos mock
        const response = await showArtwork(0);
        setArtworks(response.content);
      } catch (err) {
        toast.error('Error al cargar las obras.');
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

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

      {loading ? (
        <div className="empty-state">Cargando obras...</div>
      ) : (
        <div className="table-wrapper" style={{ marginTop: '40px' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Obra</th>
                <th>Estilo</th>
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
