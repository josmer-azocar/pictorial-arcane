import React from 'react'
import './Home.css';
import { useState, useEffect } from 'react';
import image1 from '../../assets/home-bg.jpg';
import image2 from '../../assets/home-bg2.jpg';
import image3 from '../../assets/home-bg3.jpg';
import image4 from '../../assets/home-bg4.jpg';
const homeImages = [image1, image2, image3, image4];
import { Link } from 'react-router-dom';


const Home = () => {
  // cambio de imagen cada 5 segundos
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    //intervalo que se ejecuta cada 5 segundos
    const interval = setInterval(() => {
      //Cambia el número de la imagen actual
      setCurrentImage((previousNumber) => {
        if (previousNumber === homeImages.length - 1) {
          return 0;
        } else {
          return previousNumber + 1;
        }
      });

    }, 3000); 

    //detiene el reloj si el usuario se va a otra página
    return () => clearInterval(interval);
    
  }, []); 
  return (
    <div className="home-container">
      <section className="hero-section">
        {homeImages.map((image, index) => (
          <div
            key={index}
            className={`hero-bg-layer ${index === currentImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}

        {/* La capa del gradiente oscuro */}
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1>EXPLORA EL ARTE OCULTO</h1>
          <p>Una experiencia de compra y venta de arte diseñada para ti.</p>
          <Link to="/artwork" className="cta-button">
            Buscar obras
          </Link>
        </div>
<div className="capibara-container">
  <div className="speech-bubble">
    ¡Bienvenido! Yo seré tu guía turístico 
  </div>
  <img src="/imagen/capibara.png" alt="capibara guia" className="capibara-img" />
</div>

      </section>
    
    </div>
  );
};

export default Home;