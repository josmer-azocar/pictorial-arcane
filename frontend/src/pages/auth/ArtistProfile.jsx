import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ArtistProfile.css';

const ArtistProfile = ({ mockArtists, mockArtworks }) => {
  const { id } = useParams();
  const artistId = parseInt(id);

  const [artist, setArtist] = useState(null);
  const [artworksByGenre, setArtworksByGenre] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMockData = () => {
      setLoading(true);
      setTimeout(() => {
        const foundArtist = mockArtists.find(a => a.id === artistId);
        if (foundArtist) {
          setArtist(foundArtist);
          const artistWorks = mockArtworks[artistId] || {};
          setArtworksByGenre(artistWorks);
        }
        setLoading(false);
      }, 500);
    };
    fetchMockData();
  }, [artistId, mockArtists, mockArtworks]);

  if (loading) return <div className="artp-page"><p>Cargando...</p></div>;
  if (!artist) return <div className="artp-page"><h2>Artista no encontrado</h2></div>;

  return (
    <div className="artp-page">
      {/* SECCIÓN SUPERIOR - Basada en tu boceto */}
      <div className="artp-top-layout">
        
        {/* Izquierda: Info Personal */}
        <aside className="artp-side-info">
          <div className="artp-card">
            <div className="artp-field">
              <span className="artp-label">Fecha de nacimiento:</span>
              <span className="artp-value">{artist.birth_date}</span>
            </div>
            <div className="artp-field">
              <span className="artp-label">Nacionalidad:</span>
              <span className="artp-value">{artist.nationality}</span>
            </div>
            <div className="artp-field">
              <span className="artp-label">Biografía:</span>
              <p className="artp-bio-text">{artist.biography}</p>
            </div>
          </div>
        </aside>

        {/* Derecha: Nombre y Círculo */}
        <header className="artp-main-header">
          <div className="artp-avatar-frame">
            <img 
              src={artist.photo_url} 
              alt={artist.first_name} 
              className="artp-circle-img" 
            />
          </div>
          <h1 className="artp-artist-name">
            {artist.first_name} {artist.last_name}
          </h1>
        </header>
      </div>

      {/* SECCIÓN INFERIOR - Cuadrícula de Géneros */}
      <section className="artp-gallery-section">
        <h2 className="artp-section-title">Obras por Género</h2>
        <div className="artp-genres-grid">
          {Object.entries(artworksByGenre).map(([genre, artworks]) => (
            <div key={genre} className="artp-genre-col">
              <h3 className="artp-genre-name">{genre}</h3>
              <div className="artp-works-stack">
                {artworks.map((work) => (
                  <div key={work.id} className="artp-work-item">
                    <img src={work.image_url} alt={work.title} className="artp-work-thumb" />
                    <div className="artp-work-info">
                      <span className="artp-work-title">{work.title}</span>
                      <span className="artp-work-price">${work.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArtistProfile;