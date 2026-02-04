import React from 'react';
import { Link } from 'react-router-dom';
import './ArtworkDetail.css'; 

const ArtworkDetail = ({ artwork }) => {
  if (!artwork) {
    return <div>Loading artwork details...</div>;
  }

  // Common artwork information
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
            <h3>Sculpture Details</h3>
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
            <h3>Photography Details</h3>
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
            <h3>Painting Details</h3>
            <p><strong>Technique:</strong> {artwork.technique || 'Not specified'}</p>
            <p><strong>Support:</strong> {artwork.support || 'Not specified'}</p>
            <p><strong>Style:</strong> {artwork.style || 'Not specified'}</p>
            <p><strong>Framed:</strong> {artwork.framed ? 'Yes' : 'No'}</p>
            <p><strong>Dimensions:</strong>
              {artwork.height && artwork.width ? `${artwork.height} × ${artwork.width} cm` : 'Not specified'}
            </p>
          </div>
        );

      case 'CERAMICA':
        return (
          <div className="specific-details">
            <h3>Ceramics Details</h3>
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
            <h3>Jewelry Details</h3>
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
    <div className="artwork-detail-container">
      <div className="artwork-main">
        <img src={photo_url} alt={name} className="artwork-image" />
        
        <div className="artwork-info">
          <h1>{name}</h1>
          
          <p className="artist-link">
            By{' '}
            <Link to={`/artists/${artist?.id}`}>
              {artist?.first_name} {artist?.last_name}
            </Link>
          </p>
          
          <p><strong>Price:</strong> ${price?.toLocaleString()}</p>
          <p><strong>Creation date:</strong> {new Date(creation_date).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>
      </div>

      {/* Sección de biografía del artista (siempre visible, como indica el requerimiento) */}
      {artist && (
        <div className="artist-bio">
          <h2>About the Artist</h2>
          {artist.photo_url && <img src={artist.photo_url} alt={artist.first_name} className="artist-photo" />}
          <p>{artist.biography || 'Biography not available'}</p>
          {artist.birth_date && <p><strong>Birth date:</strong> {new Date(artist.birth_date).toLocaleDateString()}</p>}
          <p><strong>Nationality:</strong> {artist.nationality || 'Not specified'}</p>
        </div>
      )}

      {/* Detalles específicos según el género de la obra */}
      {renderSpecificDetails()}
    </div>
  );
};

export default ArtworkDetail;