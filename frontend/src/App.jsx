import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header.jsx';
import ArtworkDetail from './components/artworkDetail/ArtworkDetail.jsx';
import ArtistProfile from './pages/auth/ArtistProfile.jsx';

function App() {

const testArtwork = {
  name: "Escultura de mármol",
  photo_url: "/imagen/v.jpg", 
  price: 2500,
  creation_date: "2023-06-15",
  status: "Available",
  genre: "ESCULTURA",
  material: "Mármol Carrara",
  weight: 150,
  length: 120,    // cm
  width: 60,
  depth: 60,
  artist: {
    id:1,
    first_name: "Inés",
    last_name: "Rodríguez",
    photo_url: "/imagen/venus de Milo.jpg",
    biography: "Artista especializada en escultura clásica.",
    birth_date: "1985-03-20",
    nationality: "Venezolana"
  }



  
} 
// Más obras de prueba para el artista (simulando base de datos)
  const mockArtworksByArtist = {
    1: {
      "Escultura Clásica": [
        { id: 1, title: "Venus Moderna", price: 12500, image_url: "/imagen/venus.jpg" },
        { id: 2, title: "Busto de la Memoria", price: 8300, image_url: "/imagen/busto.jpg" },
        { id: 3, title: "David Contemporáneo", price: 15000, image_url: "/imagen/david.jpg" }
      ],
      "Arte Abstracto": [
        { id: 4, title: "Formas del Tiempo", price: 6200, image_url: "/imagen/tiempo.jpg" },
        { id: 5, title: "Geometría Emocional", price: 7800, image_url: "/imagen/geo.jpg" }
      ],
      "Instalaciones": [
        { id: 6, title: "Espacio Interior", price: 22000, image_url: "/imagen/espacio.jpg" },
        { id: 7, title: "Luz y Sombra", price: 18500, image_url: "/imagen/luz.jpg" }
      ]
    }
  }
 /*<ArtworkDetail artwork={testArtwork} />*/
/*<MainAuth/>*/
return (
   
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArtworkDetail artwork={testArtwork} />} />
        <Route 
          path="/artists/:id" 
          element={
            <ArtistProfile 
              mockArtists={[testArtwork.artist]} 
              mockArtworks={mockArtworksByArtist}
            />
          } 
        />
      </Routes>

    </>
  );
}

export default App