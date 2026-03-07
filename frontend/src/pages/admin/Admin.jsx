import { useState, useEffect } from 'react';
import PendingReservations from "./PendingReservations.jsx";  
import CreateAdmin from "./CreateAdmin.jsx";
import CreateArtwork from "./CreateArtwork.jsx";
import "./Admin.css";
import CreateArtist from "./CreateArtist.jsx";
import DeleteArtist from './DeleteArtist.jsx';
import UpdateArtwork from './UpdateArtwork.jsx';
import { getArtworkById } from '../../services/fetchArtwork.js';
import AddSculpture from './AddSculpture.jsx';
import AddPainting from './AddPainting.jsx';
import AddPhotography from './AddPhotography.jsx';
import AddCeramic from './AddCeramic.jsx';
import AddGoldsmith from './AddGoldsmith.jsx';

import UpdateArtist from './UpdateArtist.jsx';
function Admin() {
  const [activeSection, setActiveSection] = useState(null); // Vista actual
  const [artworkToEditId, setArtworkToEditId] = useState(null); // ID de la obra a editar
  const [artworkToEdit, setArtworkToEdit] = useState(null); // Objeto de la obra a editar
  const [loadingEdit, setLoadingEdit] = useState(false); // Cargando la obra a editar
  const [isArtworksMenuOpen, setArtworksMenuOpen] = useState(false);
  const [isArtistsMenuOpen, setArtistsMenuOpen] = useState(false);

  // Función para cambiar de sección y limpiar estados secundarios
  const handleSectionChange = (section) => {
    setActiveSection(section);
    setArtworkToEditId(null);
    setArtworkToEdit(null);
  };

  // Cargar los datos de la obra cuando se selecciona un ID para editar
  useEffect(() => {
    if (!artworkToEditId) {
      setArtworkToEdit(null);
      return;
    }

    const fetchArtworkToEdit = async () => {
      setLoadingEdit(true);
      try {
        const data = await getArtworkById(artworkToEditId);
        setArtworkToEdit(data);
      } catch (error) {
        console.error("Error al cargar la obra para editar:", error);
        setArtworkToEditId(null); // Reset en caso de error
      } finally {
        setLoadingEdit(false);
      }
    };

    fetchArtworkToEdit();
  }, [artworkToEditId]);

  // Renderiza el formulario de edición correcto basado en el tipo de obra
  const renderUpdateForm = () => {
    if (loadingEdit) {
      return <p className="empty-state">Cargando datos de la obra...</p>;
    }

    if (!artworkToEdit) {
      return <p className="empty-state">No se pudo cargar la obra. Por favor, vuelve a intentarlo.</p>;
    }

    // Pasamos los datos de la obra al formulario correspondiente.
    // Estos formularios necesitarán ser adaptados para recibir `artworkData`.
    switch (artworkToEdit.type) {
      case 'SCULPTURE':
        return <AddSculpture artworkData={artworkToEdit} />;
      case 'PAINTING':
        return <AddPainting artworkData={artworkToEdit} />;
      case 'PHOTOGRAPHY':
        return <AddPhotography artworkData={artworkToEdit} />;
      case 'CERAMIC':
        return <AddCeramic artworkData={artworkToEdit} />;
      case 'GOLDSMITH':
        return <AddGoldsmith artworkData={artworkToEdit} />;
      default:
        return <p>Tipo de obra "{artworkToEdit.type}" no reconocido. No se puede editar.</p>;
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'createAdmin':
        return <CreateAdmin />;
      case 'reservations':
        return <PendingReservations />;
      case 'createArtwork':
        return <CreateArtwork />;
        case 'createArtist':
            return <CreateArtist />;
      case 'deleteArtist':
        return <DeleteArtist />;
      case 'updateArtist':
        return <UpdateArtist />;
      // case 'viewArtwork':
      //   return <p>Aquí irá la vista de todas las obras</p>;
      // case 'deleteArtwork':
      //   return <DeleteArtwork />;
      case 'updateArtwork':
        return artworkToEditId ?
          renderUpdateForm() :
          <UpdateArtwork onEditSelect={setArtworkToEditId} />;
      default:
        return (
          <>
            <p className="admin-eyebrow">Bienvenido de vuelta</p>
            <h1 className="admin-title">Hola,<br/><em>Administrador</em></h1>
            <div className="admin-line"></div>
            <p className="admin-subtitle">
              Gestiona obras, artistas, reservas y reportes desde este panel.
            </p>
          </>
        );
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <p className="admin-sidebar-label">Gestión</p>
        <button
          className="admin-nav-btn"
          onClick={() => setArtworksMenuOpen(!isArtworksMenuOpen)}
        >
          Gestión de Obras
        </button>
        {isArtworksMenuOpen && (
          <div className="admin-submenu">
            <button
              className={`admin-nav-btn ${activeSection === 'createArtwork' ? 'active' : ''}`}
              onClick={() => handleSectionChange('createArtwork')}
            >
              Crear Obra
            </button>
            <button
              className={`admin-nav-btn ${activeSection === 'viewArtwork' ? 'active' : ''}`}
              onClick={() => handleSectionChange('viewArtwork')}
            >
              Ver Obra
            </button>
            <button
              className={`admin-nav-btn ${activeSection === 'updateArtwork' ? 'active' : ''}`}
              onClick={() => handleSectionChange('updateArtwork')}
            >
              Actualizar Obra
            </button>
            <button
              className={`admin-nav-btn ${activeSection === 'deleteArtwork' ? 'active' : ''}`}
              onClick={() => handleSectionChange('deleteArtwork')}
            >
              Borrar Obra
            </button>
          </div>
        )}
       <button
  className="admin-nav-btn"
  onClick={() => setArtistsMenuOpen(!isArtistsMenuOpen)}
>
  Gestión de Artistas
</button>
{isArtistsMenuOpen && (
  <div className="admin-submenu">
    <button
      className={`admin-nav-btn ${activeSection === 'createArtist' ? 'active' : ''}`}
      onClick={() => handleSectionChange('createArtist')}
    >
      Crear Artista
    </button>
    <button
      className={`admin-nav-btn ${activeSection === 'viewArtist' ? 'active' : ''}`}
      onClick={() => handleSectionChange('viewArtist')}
    >
      Ver Artista
    </button>
    <button
      className={`admin-nav-btn ${activeSection === 'updateArtist' ? 'active' : ''}`}
      onClick={() => handleSectionChange('updateArtist')}
    >
      Actualizar Artista
    </button>
    <button
      className={`admin-nav-btn ${activeSection === 'deleteArtist' ? 'active' : ''}`}
      onClick={() => handleSectionChange('deleteArtist')}
    >
      Borrar Artista
    </button>
  </div>
)}
        <hr className="admin-sidebar-divider" />
        <p className="admin-sidebar-label">Operaciones</p>
        <button
          className={`admin-nav-btn ${activeSection === 'reservations' ? 'active' : ''}`}
          onClick={() => handleSectionChange('reservations')}
        >
          Reservas
        </button>
        <button className="admin-nav-btn">Facturación</button>
        <button className="admin-nav-btn">Reportes</button>
        <hr className="admin-sidebar-divider" />
        <button
          className={`admin-create-btn ${activeSection === 'createAdmin' ? 'active' : ''}`}
          onClick={() => handleSectionChange('createAdmin')}
        >
          + Crear Administrador
        </button>
      </aside>
      <main className="admin-main">
        {renderSection()}
      </main>
    </div>
  );
}

export default Admin;