import './App.css'
import Header from './components/Header.jsx';
import MainAuth from './pages/auth/MainAuth.jsx';
import Artwork from './pages/artwork/Artwork.jsx';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ArtworkDetail from './components/artworkDetail/ArtworkDetail.jsx';
import ArtistProfile from './pages/auth/ArtistProfile.jsx';
import Home from './pages/home/Home.jsx';
import About from './pages/about/about.jsx';
import Shipment from './pages/shipment/shipment.jsx';
import WhoWeAre from './pages/whoweare/WhoWeAre.jsx';
import Footer from './components/Footer.jsx';


import AuthProvider from './services/authContext.jsx'; 
import Dashboard from './pages/dashboard/Dashboard.jsx';
import PrivateRoutes from './services/PrivateRoutes.jsx'
import Admin from './pages/admin/Admin.jsx';


function App() {

const testArtwork = {
  name: "Escultura de mármol",
  photo_url: "/imagen/v.jpg", 
  price: 2500,
  creation_date: "2023-06-15",
  status: "Disponible",
  genre: "ESCULTURA",
  material: "Mármol Carrara",
  weight: 150,
  length: 120,
  width: 60,
  depth: 60,
  artist: {
    id:1,
    first_name: "Inés",
    last_name: "Rodríguez",
    photo_url: "/imagen/v.jpg",
    biography: "Artista especializada en escultura clásica.",
    birth_date: "1985-03-20",
    nationality: "Venezolana"
  }
} 

const mockArtworksByArtist = {
  1: {
    "Escultura ": [
      { id: 1, title: "Venus Moderna", price: 12500, image_url: "/imagen/v.jpg" },
      { id: 2, title: "Busto de la Memoria", price: 8300, image_url: "/imagen/v.jpg" },
      { id: 3, title: "David Contemporáneo", price: 15000, image_url: "/imagen/v.jpg" }
    ],
    "Pinturas": [
      { id: 4, title: "Formas del Tiempo", price: 6200, image_url: "/imagen/v.jpg" },
      { id: 5, title: "Geometría Emocional", price: 7800, image_url: "/imagen/v.jpg" }
    ],
    "fotografia": [
      { id: 6, title: "Espacio Interior", price: 22000, image_url: "/imagen/v.jpg" },
      { id: 7, title: "Luz y Sombra", price: 18500, image_url: "/imagen/v.jpg" }
    ]
  }
}

return (
    <AuthProvider>
        <Header />
        <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shipment" element={<Shipment />} />
          {/*<Route path="/" element={<ArtworkDetail artwork={testArtwork} />} />*/}
          <Route path="/login" element={<MainAuth />} />
          <Route path='/auth/*' element={<MainAuth/>} />
          <Route path='/artwork/*' element={<Artwork/>}/>
          
          {/* AHORA ESTA RUTA ES PÚBLICA (Acceso sin login) */}
          <Route path='/admin/*' element={<Admin/>}/>
          <Route 
            path="/artists/:id" 
            element={
              <ArtistProfile 
                mockArtists={[testArtwork.artist]} 
                mockArtworks={mockArtworksByArtist}
              />
            } 
          />
          <Route element={<PrivateRoutes/>}>
            <Route path='/dashboard/*' element={<Dashboard/>}/>
            <Route path='/admin/*' element={<Admin/>}/>
          </Route>
          {/*LAS RUTAS DEL FOOTER*/}
          <Route path="/WhoWeAre" element={<WhoWeAre />} />
        </Routes>
        </main>
        <Footer />
      </AuthProvider>
  );
}

export default App