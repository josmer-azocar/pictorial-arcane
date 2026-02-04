import React from 'react'
import './App.css'
import './components/Header.jsx'
import Header from './components/Header.jsx'
import MainAuth from './pages/auth/MainAuth.jsx'
import ArtworkDetail from './components/artworkDetail/ArtworkDetail.jsx'
 


function App() {

const testArtwork = {
  name: "Escultura de mármol",
  photo_url: "https://via.placeholder.com/800x600?text=Escultura+Marmol", 
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
    first_name: "Inés",
    last_name: "Rodríguez",
    photo_url: "https://via.placeholder.com/200?text=Ines+Rodriguez",
    biography: "Artista especializada en escultura clásica.",
    birth_date: "1985-03-20",
    nationality: "Venezolana"
  }
} 
 /*<ArtworkDetail artwork={testArtwork} />*/
/*<MainAuth/>*/
  return (
    <>
        <Header/>
       
       <ArtworkDetail artwork={testArtwork} />
     
    </>
  )
}

export default App
