import React from 'react'
import './Home.css';
import homeImage from '../../assets/home-bg.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <section 
        className="hero-section" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0) 100%), url(${homeImage})` 
        }}
      >
        <div className="hero-content">
          <h1>EXPLORA EL ARTE OCULTO</h1>
          <p>Una experiencia de compra y venta de arte diseñada para ti.</p>
           <Link to="/artwork" className="cta-button">
            Ver obras
          </Link>
        </div>
      </section>

      {/* Más adelante aquí abajo pondremos otras secciones de la página */}

    </div>
  );
};

export default Home;