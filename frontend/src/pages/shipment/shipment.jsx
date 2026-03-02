import React, { useState } from 'react';
import './shipment.css';

const Shipment = () => {
  const [destino, setDestino] = useState('venezuela');
  const [estadoVenezuela, setEstadoVenezuela] = useState('');
  const [peso, setPeso] = useState('');
  const [alto, setAlto] = useState('');
  const [ancho, setAncho] = useState('');
  const [costoEnvio, setCostoEnvio] = useState(null);
  const [error, setError] = useState('');

  const estadosDeVenezuela = [
    'Amazonas', 'Anzoátegui', 'Apure', 'Aragua', 'Barinas', 'Bolívar', 'Carabobo', 
    'Cojedes', 'Delta Amacuro', 'Distrito Capital', 'Falcón', 'Guárico', 'Lara', 
    'Mérida', 'Miranda', 'Monagas', 'Nueva Esparta', 'Portuguesa', 'Sucre', 
    'Táchira', 'Trujillo', 'La Guaira', 'Yaracuy', 'Zulia'
  ];

  const handleCalcular = (e) => {
    e.preventDefault();
    setError('');
    setCostoEnvio(null);

    if (!peso || !alto || !ancho) {
      setError('Por favor, ingresa el peso, alto y ancho de la obra.');
      return;
    }
    if (destino === 'venezuela' && !estadoVenezuela) {
      setError('Por favor, selecciona un estado para el envío nacional.');
      return;
    }

    const pesoNum = parseFloat(peso);
    const altoNum = parseFloat(alto);
    const anchoNum = parseFloat(ancho);
    const tamano = altoNum * anchoNum;
    
    let costoCalculado = 0;

    if (destino === 'venezuela') {
      const costoBase = 5;
      const recargoPeso = pesoNum * 0.5; 
      const recargoTamano = tamano * 0.01; 
      costoCalculado = costoBase + recargoPeso + recargoTamano;
    } else {
      const costoBaseInt = 30; 
      const recargoPesoInt = pesoNum * 2.5; 
      const recargoTamanoInt = tamano * 0.05; 
      costoCalculado = costoBaseInt + recargoPesoInt + recargoTamanoInt;
    }

    setCostoEnvio(costoCalculado.toFixed(2));
  };

  return (
    <div className="shipment-page">
      {/* Encabezado estilo Pictorial Arcane */}
      <div className="shipment-header">
        <h1>CALCULADORA DE ENVÍOS</h1>
        <p>Llevamos el arte oculto directamente a tus manos.</p>
      </div>

      <div className="shipment-container">
        <form onSubmit={handleCalcular} className="shipment-form">
          
          <div className="form-group">
            <label>Destino del Envío</label>
            <select 
              value={destino} 
              onChange={(e) => {
                setDestino(e.target.value);
                setCostoEnvio(null);
              }}
            >
              <option value="venezuela">Nacional (Venezuela)</option>
              <option value="internacional">Internacional</option>
            </select>
          </div>

          {destino === 'venezuela' && (
            <div className="form-group">
              <label>Estado</label>
              <select 
                value={estadoVenezuela} 
                onChange={(e) => setEstadoVenezuela(e.target.value)}
              >
                <option value="">-- Selecciona un estado --</option>
                {estadosDeVenezuela.map((estado) => (
                  <option key={estado} value={estado}>
                    {estado}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="obra-details">
            <h3>Dimensiones de la Obra</h3>
            <div className="inputs-row">
              <div className="form-group">
                <label>Peso (kg)</label>
                <input 
                  type="number" min="0.1" step="0.1" 
                  value={peso} onChange={(e) => setPeso(e.target.value)} 
                  placeholder="Ej. 2.5"
                />
              </div>
              <div className="form-group">
                <label>Alto (cm)</label>
                <input 
                  type="number" min="1" 
                  value={alto} onChange={(e) => setAlto(e.target.value)} 
                  placeholder="Ej. 50"
                />
              </div>
              <div className="form-group">
                <label>Ancho (cm)</label>
                <input 
                  type="number" min="1" 
                  value={ancho} onChange={(e) => setAncho(e.target.value)} 
                  placeholder="Ej. 40"
                />
              </div>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="calc-btn">Calcular costo</button>
        </form>

        {costoEnvio !== null && (
          <div className="result-container">
            <h3>Costo Estimado</h3>
            <p className="price">${costoEnvio}</p>
            <p className="disclaimer">
              *El costo final será verificado al momento del embalaje.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shipment;