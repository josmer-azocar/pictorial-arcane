import { Link } from 'react-router-dom';
import './ArtworkDetail.css'; 
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../services/AuthContext.jsx';
import { getArtworkById } from '../../services/fetchArtwork.js';
import { reserveArtwork } from '../../services/fetchSales.js';
import { getAssignedSecurityQuestions, recoverSecurityCode } from '../../services/authUser.js';

// ── ÍCONOS SVG ──────────────────────────────────────────────
const CertificateIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_iconCarrier">
      <path d="M330.147 727.583l-3.105-2.113c-23.995-16.366-56.736-10.206-73.12 13.753L120.381 934.43c-16.389 23.958-10.22 56.646 13.779 73.002l3.1 2.118c24 16.366 56.741 10.206 73.125-13.752l133.542-195.207c16.388-23.959 10.219-56.642-13.78-73.008z" fill="#E5594F"/>
      <path d="M457.934 727.583l-3.1-2.113c-23.999-16.366-56.74-10.206-73.129 13.753L248.168 934.43c-16.388 23.958-10.22 56.646 13.775 73.002l3.109 2.118c23.995 16.366 56.736 10.206 73.12-13.752l133.537-195.207c16.394-23.959 10.225-56.642-13.775-73.008z" fill="#F0D043"/>
      <path d="M712.252 364.688L577.453 338.78l-66.275-120.278-66.28 120.278-134.794 25.908 93.834 100.25-17.037 136.291 124.277-58.327 124.272 58.327-17.037-136.291z" fill="#F39A2B"/>
      <path d="M803.625 434.496c-1.459 160.596-131.855 290.993-292.452 292.453-76.346 0.693-150.076-30.799-204.647-83.529-56.995-55.073-87.084-130.821-87.796-208.923-0.676-74.35-116.033-74.415-115.355 0 2.034 223.497 184.3 405.775 407.798 407.807 223.519 2.032 405.803-187.375 407.808-407.807 0.675-74.416-114.679-74.351-115.356-0.001z" fill="#4A5699"/>
      <path d="M218.73 415.399c1.462-160.594 131.845-290.992 292.443-292.455 76.347-0.696 150.079 30.801 204.647 83.531 56.997 55.075 87.093 130.822 87.805 208.923 0.677 74.35 116.031 74.416 115.355 0C916.948 191.905 734.669 9.624 511.173 7.589c-223.518-2.035-405.793 187.38-407.798 407.81-0.678 74.415 114.679 74.35 115.355 0z" fill="#C45FA0"/>
    </g>
  </svg>
);

const SecureIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_iconCarrier">
      <path d="M877.387 523.945c-1.663 198.958-163.571 360.868-362.532 362.531-198.991 1.661-360.885-166.07-362.526-362.531-0.697-83.354-130.015-83.42-129.318 0 1.064 127.401 49.851 247.752 136.97 340.531 86.427 92.047 208.144 143.457 333.116 150.77 127.267 7.454 251.374-40.885 347.279-122.774 96.086-82.04 150.659-201.304 164.166-325.296 1.565-14.352 2.04-28.805 2.16-43.23 0.697-83.421-128.618-83.355-129.315-0.001z" fill="#4A5699"/>
      <path d="M152.329 500.646c1.662-198.965 163.563-360.875 362.526-362.537 83.354-0.697 83.419-130.013 0-129.317-129.524 1.081-252.396 51.567-345.385 141.68C75.465 241.564 24.097 370.538 23.011 500.646c-0.697 83.421 128.62 83.349 129.318 0z" fill="#C45FA0"/>
    </g>
  </svg>
);

const GlobalShippingIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_iconCarrier">
      <path d="M736.68 435.86a173.773 173.773 0 0 1 172.042 172.038c0.578 44.907-18.093 87.822-48.461 119.698-32.761 34.387-76.991 51.744-123.581 52.343-68.202 0.876-68.284 106.718 0 105.841 152.654-1.964 275.918-125.229 277.883-277.883 1.964-152.664-128.188-275.956-277.883-277.879-68.284-0.878-68.202 104.965 0 105.842zM285.262 779.307A173.773 173.773 0 0 1 113.22 607.266c-0.577-44.909 18.09-87.823 48.461-119.705 32.759-34.386 76.988-51.737 123.58-52.337 68.2-0.877 68.284-106.721 0-105.842C132.605 331.344 9.341 454.607 7.379 607.266 5.417 759.929 135.565 883.225 285.262 885.148c68.284 0.876 68.2-104.965 0-105.841z" fill="#4A5699"/>
      <path d="M339.68 384.204a173.762 173.762 0 0 1 172.037-172.038c44.908-0.577 87.822 18.092 119.698 48.462 34.388 32.759 51.743 76.985 52.343 123.576 0.877 68.199 106.72 68.284 105.843 0-1.964-152.653-125.231-275.917-277.884-277.879-152.664-1.962-275.954 128.182-277.878 277.879-0.88 68.284 104.964 68.199 105.841 0z" fill="#C45FA0"/>
    </g>
  </svg>
);

// ── COMPONENTE PRINCIPAL ─────────────────────────────────────
const ArtworkDetail = ({ artwork: artworkProp }) => {

  const { id } = useParams();
  const { token } = useAuth();

  const [artwork, setArtwork] = useState(artworkProp || null);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [securityCode, setSecurityCode] = useState("");

  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [assignedQuestions, setAssignedQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  // GET /artwork/{id}
  useEffect(() => {
    if (id) {
      getArtworkById(id).then(data => setArtwork(data));
    }
  }, [id]);

  // GET /questions/getAssignedQuestions
  useEffect(() => {
    if (showRecoveryModal && token) {
      const loadQuestions = async () => {
        try {
          const questions = await getAssignedSecurityQuestions(token);
          setAssignedQuestions(questions);
          const initialAnswers = {};
          questions.forEach(q => initialAnswers[q.idQuestion] = "");
          setAnswers(initialAnswers);
        } catch (err) {
          toast.error(err.message || "No se pudieron cargar las preguntas");
          setShowRecoveryModal(false);
        }
      };
      loadQuestions();
    }
  }, [showRecoveryModal, token]);

  if (!artwork) return <div>Loading artwork details...</div>;

  const { name, photo_url, price, creation_date, status, artist, genre } = artwork;

  // POST /sale/reserve
  const handleReservar = async () => {
    try {
      await reserveArtwork(artwork.idArtWork, securityCode, token);
      toast.success("¡Obra reservada exitosamente!");
      setShowModal(false);
    } catch (err) {
      if (err.response?.status === 400) toast.error("Código de seguridad incorrecto.");
      else if (err.response?.status === 409) toast.error("La obra ya no está disponible.");
      else toast.error("Error al procesar la reserva.");
    }
  };

  // PUT /questions/RecoverClientCode
  const handleRecoverCode = async () => {
    try {
      const answersArray = assignedQuestions.map(q => ({
        idQuestion: q.idQuestion,
        Answer: answers[q.idQuestion] || ""
      }));
      await recoverSecurityCode(answersArray, token);
      toast.success("✓ Código enviado a tu correo registrado.");
      setShowRecoveryModal(false);
      setAssignedQuestions([]);
    } catch (err) {
      toast.error("Respuestas incorrectas. Inténtalo de nuevo.");
    }
  };

  const renderSpecificDetails = () => {
    switch (genre) {
      case 'ESCULTURA':
        return (
          <div className="specific-details">
            <h3>Detalles de la escultura</h3>
            <p><strong>Material:</strong> {artwork.material || 'Not specified'}</p>
            <p><strong>Weight:</strong> {artwork.weight ? `${artwork.weight} kg` : 'Not specified'}</p>
            <p><strong>Dimensions:</strong> {artwork.length && artwork.width && artwork.depth ? `${artwork.length} × ${artwork.width} × ${artwork.depth} cm` : 'Not specified'}</p>
          </div>
        );
      case 'FOTOGRAFIA':
        return (
          <div className="specific-details">
            <h3>Detalles de la fotografía</h3>
            <p><strong>Print type:</strong> {artwork.print_type || 'Not specified'}</p>
            <p><strong>Resolution:</strong> {artwork.resolution || 'Not specified'}</p>
            <p><strong>Color:</strong> {artwork.color === 'color' ? 'In color' : artwork.color === 'bn' ? 'Black and white' : 'Not specified'}</p>
            <p><strong>Edition number:</strong> {artwork.edition_number || 'Not specified'}</p>
            <p><strong>Camera:</strong> {artwork.camera || 'Not specified'}</p>
          </div>
        );
      case 'PINTURA':
        return (
          <div className="specific-details">
            <h3>Detalles de la pintura</h3>
            <p><strong>Technique:</strong> {artwork.technique || 'Not specified'}</p>
            <p><strong>Support:</strong> {artwork.support || 'Not specified'}</p>
            <p><strong>Style:</strong> {artwork.style || 'Not specified'}</p>
            <p><strong>Framed:</strong> {artwork.framed ? 'Yes' : 'No'}</p>
            <p><strong>Dimensions:</strong> {artwork.height && artwork.width ? `${artwork.height} × ${artwork.width} cm` : 'Not specified'}</p>
          </div>
        );
      case 'CERAMICA':
        return (
          <div className="specific-details">
            <h3>Detalles de la cerámica</h3>
            <p><strong>Material type:</strong> {artwork.material_type || 'Not specified'}</p>
            <p><strong>Technique:</strong> {artwork.technique || 'Not specified'}</p>
            <p><strong>Finish:</strong> {artwork.finish || 'Not specified'}</p>
            <p><strong>Firing temperature:</strong> {artwork.firing_temperature ? `${artwork.firing_temperature} °C` : 'Not specified'}</p>
            <p><strong>Weight:</strong> {artwork.weight ? `${artwork.weight} kg` : 'Not specified'}</p>
            <p><strong>Dimensions:</strong> {artwork.height && artwork.width ? `${artwork.height} × ${artwork.width} cm` : 'Not specified'}</p>
          </div>
        );
      case 'ORFEBRERIA':
        return (
          <div className="specific-details">
            <h3>Detalles de orfebrería</h3>
            <p><strong>Main material:</strong> {artwork.main_material || 'Not specified'}</p>
            <p><strong>Gemstones:</strong> {artwork.gemstones || 'None'}</p>
            <p><strong>Weight:</strong> {artwork.weight ? `${artwork.weight} kg` : 'Not specified'}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="artwork-detail-page">
      <main className="product-layout">

        {/* COLUMNA 1: IMAGEN */}
        <section className="artwork-gallery">
          <div className="image-frame" style={{ position: 'relative' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setZoomPos({
                x: ((e.clientX - rect.left) / rect.width) * 100,
                y: ((e.clientY - rect.top) / rect.height) * 100,
              });
            }}
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
          >
            <img src={photo_url} alt={name} className="main-artwork-img" />
            <div className={`status-badge ${status.toLowerCase()}`}>{status}</div>
            {showZoom && (
              <div style={{
                position: 'absolute', top: 0, right: '-310px',
                width: '300px', height: '300px',
                border: '2px solid #d5d9d9', borderRadius: '8px',
                backgroundImage: `url(${photo_url})`,
                backgroundSize: '400%',
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                zIndex: 100, pointerEvents: 'none',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
              }}/>
            )}
          </div>
        </section>

        {/* COLUMNA 2: FICHA TÉCNICA */}
        <section className="detailed-info-grid">
          <div className="info-card">
            <h1 className="artwork-title">{name}</h1>
            <div className="specs-container">
              <p><strong>Género:</strong> {genre}</p>
              <strong>Fecha de creación:</strong>{' '}
              {creation_date
                ? new Date(creation_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
                : 'No especificada'}
              <div className="artist-attribution">
                Artista:
                <Link
                  to={artist?.id ? `/artists/${artist.id}` : '#'}
                  className="artist-link-bold"
                  onClick={(e) => { if (!artist?.id) { e.preventDefault(); alert('ID del artista no disponible'); } }}
                >
                  {artist?.first_name} {artist?.last_name}
                </Link>
                <span className="verified-check">✓</span>
              </div>
              {renderSpecificDetails()}
            </div>
          </div>
        </section>

        {/* COLUMNA 3: COMPRA */}
        <section className="artwork-purchase-panel">
          <div className="price-container">
            <span className="currency">$</span>
            <span className="amount">{price?.toLocaleString()}</span>
            <small className="tax-note">+ IVA</small>
          </div>
          <div className="actions-area">
            {status === 'Disponible' || status === 'AVAILABLE' ? (
              <>
                <button className="buy-now-btn" onClick={() => setShowModal(true)}>
                  Comprar Obra
                </button>
                <p className="process-note">Se solicitará su código de seguridad al procesar.</p>
              </>
            ) : (
              <button className="disabled-btn" disabled>Obra {status}</button>
            )}
          </div>
          <div className="trust-signals">
            <div className="signal"><SecureIcon size={28} /><span>Pago Seguro Encriptado</span></div>
            <div className="trust-item"><GlobalShippingIcon size={28} /><span>Envío Seguro</span></div>
            <div className="signal"><CertificateIcon size={28} /><span>Certificado de Autenticidad</span></div>
          </div>
        </section>

        {/* MODAL: CÓDIGO DE SEGURIDAD */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Ingresa tu Código de Seguridad</h3>
              <p className="modal-subtitle">Este código fue enviado a tu correo al registrarte.</p>
              <input
                type="text"
                placeholder="Código de seguridad"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                className="modal-input"
              />
              <div className="modal-buttons">
                <button className="modal-btn modal-btn-cancel" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button className="modal-btn modal-btn-confirm" onClick={handleReservar}>
                  Confirmar Compra
                </button>
              </div>
              <div className="forgot-link-container">
                <button className="forgot-link" onClick={() => { setShowModal(false); setShowRecoveryModal(true); }}>
                  ¿Has olvidado tu código de seguridad?
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: RECUPERAR CÓDIGO */}
        {showRecoveryModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Recuperar Código de Seguridad</h3>
              <p className="modal-subtitle">Responde tus preguntas de seguridad</p>
              {assignedQuestions.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#888' }}>Cargando preguntas...</p>
              ) : (
                assignedQuestions.map((q) => (
                  <div key={q.idQuestion} style={{ marginBottom: '16px' }}>
                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
                      {q.wording}
                    </label>
                    <input
                      type="text"
                      placeholder="Tu respuesta"
                      value={answers[q.idQuestion] || ""}
                      onChange={(e) => setAnswers(prev => ({ ...prev, [q.idQuestion]: e.target.value }))}
                      className="modal-input"
                    />
                  </div>
                ))
              )}
              <div className="modal-buttons">
                <button className="modal-btn modal-btn-cancel" onClick={() => { setShowRecoveryModal(false); setAssignedQuestions([]); }}>
                  Cancelar
                </button>
                <button className="modal-btn modal-btn-confirm" onClick={handleRecoverCode}>
                  Recuperar Código
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </main>
    </div>
  );
};

export default ArtworkDetail;