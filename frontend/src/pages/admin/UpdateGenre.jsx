import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getGenres, updateGenre } from '../../services/fetchArtwork';
import './Admin.css';

const UpdateGenre = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [newDescription, setNewDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const loadGenres = async () => {
    setLoading(true);
    try {
      const response = await getGenres();
      setGenres(response);
    } catch (err) {
      toast.error('Error al cargar los géneros.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  const handleEditClick = (genre) => {
    setSelectedGenre(genre);
    setNewDescription(genre.description);
  };

  const handleCancel = () => {
    setSelectedGenre(null);
    setNewDescription('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!newDescription.trim()) {
        toast.error("La descripción no puede estar vacía.");
        return;
    }
    setIsEditing(true);
    try {
        // TODO: Pasar el token real
        await updateGenre(selectedGenre.id, { description: newDescription }, null);
        toast.success(`Género "${selectedGenre.description}" actualizado a "${newDescription}".`);
        
        // Actualizamos la lista localmente para ver el cambio al instante
        setGenres(prevGenres => 
            prevGenres.map(g => 
                g.id === selectedGenre.id ? { ...g, description: newDescription } : g
            )
        );

        handleCancel(); // Cerramos el formulario
    } catch (error) {
        console.error(error);
        toast.error("Error al actualizar el género.");
    } finally {
        setIsEditing(false);
    }
  };

  return (
    <div className="admin-section">
      <ToastContainer position="top-center" theme="dark" />
      <h1 className="section-title">Actualizar Género</h1>
      <div className="admin-line"></div>
      <p className="admin-subtitle">
        Selecciona un género para modificar su descripción.
      </p>

      {loading ? (
        <div className="empty-state">Cargando géneros...</div>
      ) : (
        <div className="table-wrapper" style={{ marginTop: '40px' }}>
          <table className="admin-table">
            <thead>
              <tr><th>ID</th><th>Descripción</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {genres.map(genre => (
                <tr key={genre.id}>
                  <td className="td-id">#{genre.id}</td>
                  <td>{genre.description}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-invoice" onClick={() => handleEditClick(genre)}>Editar</button>
                    </div>
                  </td>
                </tr>
              ))}
              {genres.length === 0 && <tr><td colSpan="3" className="empty-state">No hay géneros registrados.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {selectedGenre && (
        <div className="admin-form-container" style={{ marginTop: '40px', maxWidth: '100%' }}>
          <h2 className="section-title" style={{ fontSize: '24px' }}>Editando: {selectedGenre.description}</h2>
          <form onSubmit={handleSave} className="admin-form" style={{marginTop: '20px'}}>
            <div className="form-group"><label className="form-label">Nueva Descripción</label><input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} required /></div>
            <div className="modal-actions" style={{justifyContent: 'flex-start'}}><button type="submit" className="btn-primary" disabled={isEditing}>{isEditing ? 'Guardando...' : 'Guardar Cambios'}</button><button type="button" className="btn-secondary" onClick={handleCancel} disabled={isEditing}>Cancelar</button></div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateGenre;