import React from 'react'
import './Home.css'
import heroImage from '../../assets/hero-bg.jpg'

const Home = () => {
  return (
    <div className="home-container">
      <section 
         className="hero-section" 
        style={{ 
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%), url(${heroImage})` 
        }}
      >
        
        {/* 2. ESTA ES LA CAJA QUE SEGURAMENTE FALTABA */}
        <div className="hero-content">
          <h1>EXPLORA EL ARTE OCULTO</h1>
          <p>Una experiencia de compra y venta de arte diseñada para ti.</p>
          <button className="cta-button">Ver Obras</button>
        </div>

      </section>

      {/* Más adelante aquí abajo pondremos otras secciones de la página */}

    </div>
  );
};

export default Home;