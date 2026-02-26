import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Pictorial Arcane. Todos los derechos reservados.</p>
        <ul className="footer-links">
          <li><a href="#contacto">Contacto</a></li>
          <li><a href="#privacidad">Privacidad</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;