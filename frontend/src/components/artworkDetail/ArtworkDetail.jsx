import React from 'react';
import { Link } from 'react-router-dom';
import './ArtworkDetail.css'; 

const TruckIcon = ({ size = 28, color = 'currentColor' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 200 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10 10H110V70H10V10Z" stroke={color} strokeWidth="6" strokeLinejoin="round"/>
    <path d="M110 35H145L155 70H110V35Z" stroke={color} strokeWidth="6" strokeLinejoin="round"/>
    <path d="M118 43H138L144 63H118V43Z" stroke={color} strokeWidth="4" strokeLinejoin="round"/>
    <line x1="10" y1="70" x2="155" y2="70" stroke={color} strokeWidth="6"/>
    <circle cx="35" cy="90" r="15" stroke={color} strokeWidth="6" fill="white"/>
    <circle cx="35" cy="90" r="5" fill={color}/>
    <circle cx="130" cy="90" r="15" stroke={color} strokeWidth="6" fill="white"/>
    <circle cx="130" cy="90" r="5" fill={color}/>
    <rect x="153" y="60" width="5" height="10" rx="2" fill={color}/>
  </svg>
);

const ArtworkDetail = ({ artwork }) => {
  if (!artwork) {
    return <div>Loading artwork details...</div>;
  }

  
  const {
    name,
    photo_url,
    price,
    creation_date,
    status,
    artist,
    genre,
  } = artwork;

  // Renderizado condicional de detalles específicos según el género

  const renderSpecificDetails = () => {
    switch (genre) {
      case 'ESCULTURA':
        return (
          <div className="specific-details">
            <h3>Detalles de la escultura</h3>
            <p><strong>Material:</strong> {artwork.material || 'Not specified'}</p>
            <p><strong>Weight:</strong> {artwork.weight ? `${artwork.weight} kg` : 'Not specified'}</p>
            <p><strong>Dimensions:</strong>
              {artwork.length && artwork.width && artwork.depth
                ? `${artwork.length} × ${artwork.width} × ${artwork.depth} cm`
                : 'Not specified'}
            </p>
          </div>
        );

      case 'FOTOGRAFIA':
        return (
          <div className="specific-details">
            <h3>Detalles de la fotografia</h3>
            <p><strong>Print type:</strong> {artwork.print_type || 'Not specified'}</p>
            <p><strong>Resolution:</strong> {artwork.resolution || 'Not specified'}</p>
            <p><strong>Color:</strong> {artwork.color === 'color' ? 'In color' : artwork.color === 'bn' ? 
            'Black and white' : 'Not specified'}</p>
            <p><strong>Edition number:</strong> {artwork.edition_number || 'Not specified'}</p>
            <p><strong>Camera:</strong> {artwork.camera || 'Not specified'}</p>
          </div>
        );

      case 'PINTURA':
        return (
          <div className="specific-details">
            <h3>Destalles de la pintera</h3>
            <p><strong>Technique:</strong> {artwork.technique || 'Not specified'}</p>
            <p><strong>Support:</strong> {artwork.support || 'Not specified'}</p>
            <p><strong>Style:</strong> {artwork.style || 'Not specified'}</p>
            <p><strong>Framed:</strong> {artwork.framed ? 'Yes' : 'No'}</p>
            <p><strong>Dimensions:</strong>
              {artwork.height && artwork.width ? `${artwork.height} × ${artwork.width} cm` 
              : 'Not specified'}
            </p>
          </div>
        );

      case 'CERAMICA':
        return (
          <div className="specific-details">
            <h3>Detalles de la ceramica</h3>
            <p><strong>Material type:</strong> {artwork.material_type || 'Not specified'}</p>
            <p><strong>Technique:</strong> {artwork.technique || 'Not specified'}</p>
            <p><strong>Finish:</strong> {artwork.finish || 'Not specified'}</p>
            <p><strong>Firing temperature:</strong> {artwork.firing_temperature ? 
            `${artwork.firing_temperature} °C` : 'Not specified'}</p>
            <p><strong>Weight:</strong> {artwork.weight ? `${artwork.weight} kg` : 'Not specified'}</p>
            <p><strong>Dimensions:</strong>
              {artwork.height && artwork.width ? `${artwork.height} × ${artwork.width} cm` : 'Not specified'}
            </p>
          </div>
        );

      case 'ORFEBRERIA':
        return (
          <div className="specific-details">
            <h3>Detalles de orfebreria</h3>
            <p><strong>Main material:</strong> {artwork.main_material || 'Not specified'}</p>
            <p><strong>Gemstones:</strong> {artwork.gemstones || 'None'}</p>
            <p><strong>Weight:</strong> {artwork.weight ? `${artwork.weight} kg` : 'Not specified'}</p>
          </div>
        );

      default:
        return null;
    }
  };

  
  return (
  <div className="artwork-detail-page">
    
    <main className="product-layout">
      
      
      <section className="artwork-gallery">
        <div className="image-frame">
          <img src={photo_url} alt={name} className="main-artwork-img" />

          {/* Badge de estatus : Disponible, Reservada o Vendida */}
          <div className={`status-badge ${status.toLowerCase()}`}>{status}</div>
        </div>
      </section>


      {/* Columna Derecha: Panel de Compra e Información Crítica */}
      <section className="artwork-purchase-panel">
        <h1 className="artwork-title">{name}</h1>
        
        {/* Link al artista*/}

<div className="artist-attribution">
  Artista Verificado: 
  <Link 
    to={artist?.id ? `/artists/${artist.id}` : '#'}  // Evita ruta rota
    className="artist-link-bold"
    onClick={(e) => {
      if (!artist?.id) {
        e.preventDefault();
        alert('ID del artista no disponible aún');
      }
    }}
  >
    {artist?.first_name} {artist?.last_name}
  </Link>
  <span className="verified-check">✓</span>
</div>


        <div className="price-container">
          <span className="currency">$</span>
          <span className="amount">{price?.toLocaleString()}</span>

          {/* especifica que el IVA se calcula aparte  */}
          <small className="tax-note">+ IVA</small>
        </div>

        {/* Área de Acción */}
        <div className="actions-area">
          {status === 'Disponible' ? (
            <>
              <button className="buy-now-btn">Comprar Obra</button>
              <p className="process-note">
                Se solicitará su código de seguridad al procesar.
              </p>
            </>
          ) : (
            <button className="disabled-btn" disabled>Obra {status}</button>
          )}
        </div>

        {/* ELEMENTOS*/}
        <div className="trust-signals">
          <div className="signal">
            <i className="fas fa-lock"></i>
            <span>Pago Seguro Encriptado</span>
          </div>

          
          <div className="trust-item">
  <TruckIcon size={28} />
  <span>Envío Seguro Global</span>
</div>

          <div className="signal">
            <i className="fas fa-certificate"></i>
            <span>Certificado de Autenticidad</span>
          </div>
        </div>
      </section>
    </main>

    {/*Sección Inferior: Detalles Técnicos y Biografía  */}

    <section className="detailed-info-grid">
      <div className="info-card">
        <h2>Ficha Técnica</h2>
        <div className="specs-container">
         
          <p><strong>Género:</strong> {genre}</p>
       <p>
  <strong>Fecha de creación:</strong>{' '}
  {creation_date 
    ? new Date(creation_date).toLocaleDateString('es-ES', { 
        day: 'numeric', 
         month: 'long', 
        year: 'numeric'
      })
    : 'No especificada'}
</p>
          
          {/* Aquí se renderizan los detalles específicos*/}
          {renderSpecificDetails()}
        </div>
      </div>

      
    </section>
  </div>
);
};

export default ArtworkDetail;