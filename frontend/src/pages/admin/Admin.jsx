import { useState } from 'react';
import PendingReservations from "./PendingReservations.jsx";  
import "./Admin.css";

function Admin() {
  const [activeSection, setActiveSection] = useState(null);

  const renderSection = () => {
    switch (activeSection) {
      case 'reservations':
        return <PendingReservations />;
      // Aquí irán las demás secciones cuando estén listas
      // case 'reports': return <SalesReport />;
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
        <button className="admin-nav-btn">Gestión de Obras</button>
        <button className="admin-nav-btn">Gestión de Artistas</button>
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
        <button className="admin-create-btn">+ Crear Administrador</button>
      </aside>
      <main className="admin-main">
        {renderSection()}
      </main>
    </div>
  );
}

export default Admin;