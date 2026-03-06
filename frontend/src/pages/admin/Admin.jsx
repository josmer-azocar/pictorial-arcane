import { useState } from 'react';
import PendingReservations from "./PendingReservations.jsx";  
import CreateAdmin from "./CreateAdmin.jsx";
import CreateArtwork from "./CreateArtwork.jsx";
import "./Admin.css";
import CreateArtist from "./CreateArtist.jsx";
import DeleteArtist from './DeleteArtist.jsx';
import UpdateArtist from './UpdateArtist.jsx';
function Admin() {
  const [activeSection, setActiveSection] = useState(null);
  const [isArtworksMenuOpen, setArtworksMenuOpen] = useState(false);
  const [isArtistsMenuOpen, setArtistsMenuOpen] = useState(false);

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
      //   return <ViewArtwork />;
      // case 'updateArtwork':
      //   return <UpdateArtwork />;
      // case 'deleteArtwork':
      //   return <DeleteArtwork />;
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
              onClick={() => setActiveSection('createArtwork')}
            >
              Crear Obra
            </button>
            <button
              className={`admin-nav-btn ${activeSection === 'viewArtwork' ? 'active' : ''}`}
              onClick={() => setActiveSection('viewArtwork')}
            >
              Ver Obra
            </button>
            <button
              className={`admin-nav-btn ${activeSection === 'updateArtwork' ? 'active' : ''}`}
              onClick={() => setActiveSection('updateArtwork')}
            >
              Actualizar Obra
            </button>
            <button
              className={`admin-nav-btn ${activeSection === 'deleteArtwork' ? 'active' : ''}`}
              onClick={() => setActiveSection('deleteArtwork')}
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
      onClick={() => setActiveSection('createArtist')}
    >
      Crear Artista
    </button>
    <button
      className={`admin-nav-btn ${activeSection === 'viewArtist' ? 'active' : ''}`}
      onClick={() => setActiveSection('viewArtist')}
    >
      Ver Artista
    </button>
    <button
      className={`admin-nav-btn ${activeSection === 'updateArtist' ? 'active' : ''}`}
      onClick={() => setActiveSection('updateArtist')}
    >
      Actualizar Artista
    </button>
    <button
      className={`admin-nav-btn ${activeSection === 'deleteArtist' ? 'active' : ''}`}
      onClick={() => setActiveSection('deleteArtist')}
    >
      Borrar Artista
    </button>
  </div>
)}
        <hr className="admin-sidebar-divider" />
        <p className="admin-sidebar-label">Operaciones</p>
        <button
          className={`admin-nav-btn ${activeSection === 'reservations' ? 'active' : ''}`}
          onClick={() => setActiveSection('reservations')}
        >
          Reservas
        </button>
        <button className="admin-nav-btn">Facturación</button>
        <button className="admin-nav-btn">Reportes</button>
        <hr className="admin-sidebar-divider" />
        <button
          className={`admin-create-btn ${activeSection === 'createAdmin' ? 'active' : ''}`}
          onClick={() => setActiveSection('createAdmin')}
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