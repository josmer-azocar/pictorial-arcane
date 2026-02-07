import React from 'react';
import './ArtistProfile.css';

const ArtistProfile = () => { 
  // Definimos los datos de la artista aquí mismo
  const artist = {
    first_name: "Inés",
    last_name: "Rodríguez",
    photo_url: "https://via.placeholder.com/300?text=Ines+Rodriguez",
    biography: "Artista especializada en escultura clásica.",
    nationality: "Venezolana"
  }

  // El return debe estar DENTRO de las llaves principales de la función
  return (
    <div className="artist-profile-page">
      <div className="artist-header">
        <img 
          src={artist.photo_url} 
          alt={`${artist.first_name} ${artist.last_name}`} 
          style={{ width: '200px', borderRadius: '50%' }} 
        />
        <h1>{artist.first_name} {artist.last_name}</h1>
      </div>
      <div className="artist-info">
        <p><strong>Nacionalidad:</strong> {artist.nationality}</p>
        <p><strong>Biografía:</strong> {artist.biography}</p>
      </div>
    </div>
  );
}; 

export default ArtistProfile;