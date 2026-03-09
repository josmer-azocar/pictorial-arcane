import './MainAuth.css';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
//import { useAuth } from '../../services/AuthContext.jsx';
import axios from 'axios';
import {
    registerUser,
    updateSecurityAnswer,
    updateClientInfo,
    createMembership ,
    createSecurityCode
} from '../../services/authUser.js';

import Loading from '../../components/Loading.jsx';

function Sign() {
    // Estado inicial de los datos
    const [registerData, setRegister] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        tarjeta_credito: "",
        codigo_postal: "",
        email: "",
        password: "",
        securityAnswers: [          
        { idQuestion: "", answer: "" },
        { idQuestion: "", answer: "" },
        { idQuestion: "", answer: "" }
    ]
    });

    const [errMessage, setErrMessage] = useState("");
    const [loadPage, setLoadPage] = useState(false);
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [authToken, setAuthToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [preguntasBackend, setPreguntasBackend] = useState([]);
  
const [isLoadingPreguntas, setIsLoadingPreguntas] = useState(false);
const [errorPreguntas, setErrorPreguntas] = useState(null);


useEffect(() => {
    if (step === 3 && authToken) {
        setIsLoadingPreguntas(true);
        setErrorPreguntas(null);

        axios.get('/api/questions/getAllQuestions', {  //se consume un enpont y se pase un token 
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then(res => {
            console.log("Preguntas OK:", res.data);
            setPreguntasBackend(res.data || []);  // fuerza array
        })
        .catch(err => {
            console.error("Error preguntas:", err);
            setErrorPreguntas("No se pudieron cargar las preguntas");
            setPreguntasBackend([]); // evita undefined
        })
        .finally(() => {
            setIsLoadingPreguntas(false);
        });
    }
}, [step, authToken]);

// Recupera token y paso si la página se recarga
useEffect(() => {
    const savedToken = sessionStorage.getItem('reg_token');
    const savedStep = sessionStorage.getItem('reg_step');
     const savedData = sessionStorage.getItem('reg_data');

    if (savedToken) setAuthToken(savedToken);
    if (savedStep) setStep(parseInt(savedStep));
     if (savedData) setRegister(JSON.parse(savedData)); 
    
}, []);

useEffect(() => {

        sessionStorage.setItem('reg_data', JSON.stringify(registerData));
    
}, [registerData]);
// Guarda el paso actual en sessionStorage
useEffect(() => {
    if (step > 2) {
        sessionStorage.setItem('reg_step', step);
    }
}, [step]);

    // --- FUNCIONES DE NAVEGACIÓN Y VALIDACIÓN ---

    // PASO 1: Validación de Identidad Básica
    const handleNext1 = () => {
        setErrMessage("");
        const dniRegex = /^\d+$/; // Validar que la cédula sea numérica
        if (!registerData.nombre || !registerData.apellido || !registerData.dni) {
            setErrMessage("Por favor, completa tus datos personales.");
            return;
        } else if (!dniRegex.test(registerData.dni)) {
            setErrMessage("La cédula solo puede contener números.");
            return;
        }
        setStep(2);
    };

   const handleNext2 = async () => {
     setErrMessage("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const specialCharRegex = /[0-9!@#$%^&*]/;
    const dominiosPermitidos = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'icloud.com'];
    const dominio = registerData.email.split('@')[1];

    if (!registerData.email || !registerData.password) {
        setErrMessage("Completa el correo y la contraseña.");
        return;
    } else if (!emailRegex.test(registerData.email)) {
        setErrMessage("Debes colocar un correo válido.");
        return;
    } else if (!dominiosPermitidos.includes(dominio)) {
        setErrMessage("Solo se permiten correos de Gmail, Hotmail, Outlook, Yahoo o iCloud.");
        return;
    } else if (registerData.password.length < 8) {
        setErrMessage("La contraseña debe tener al menos 8 caracteres.");
        return;
    } else if (!specialCharRegex.test(registerData.password)) {
        setErrMessage("La contraseña requiere un carácter especial o número.");
        return;
    } else if (registerData.password !== confirmPassword) {
        setErrMessage("Las contraseñas no coinciden.");
        return;
    }
    
    setIsLoading(true);
    try {
        const data = await registerUser({
            dniUser: parseInt(registerData.dni.replace(/[.,]/g, '')),
            email: registerData.email,
            password: registerData.password,
            firstName: registerData.nombre,
            lastName: registerData.apellido,
            role: 'CLIENT'
        });
        setAuthToken(data.token);
        sessionStorage.setItem('reg_token', data.token);
        setStep(3);
    } catch (err) {
        console.error("Error al crear la cuenta:", err);
        const msg = err.response?.data?.message || "El correo ya está registrado.";
    toast.error(msg, {
        position: "top-center",
        autoClose: 4000,  });
    } finally {
        setIsLoading(false);
    }
};

//PASO 3:Seleccion y respuesta de preguntas de seguridad 
const handleNext3 = async () => {
    setErrMessage("");

    // Verificar que todas tengan pregunta seleccionada
    const incompletas = registerData.securityAnswers.some(r => !r.idQuestion || !r.answer.trim());
    if (incompletas) {
        setErrMessage("Selecciona una pregunta y escribe tu respuesta en cada campo.");
        return;
    }

    // Verificar que no haya preguntas repetidas
    const ids = registerData.securityAnswers.map(r => parseInt(r.idQuestion));
    const hayRepetidas = new Set(ids).size !== ids.length;
    if (hayRepetidas) {
        setErrMessage("No puedes repetir la misma pregunta.");
        return;
    }

    setIsLoading(true);
    try {
        for (const r of registerData.securityAnswers) {
            await updateSecurityAnswer(parseInt(r.idQuestion), r.answer, authToken);
        }
        setStep(4);
    } catch (err) {
        setErrMessage("Error al guardar las preguntas.");
    } finally {
        setIsLoading(false);
    }
};

    // PASO 4: Registro Final y Pago de Membresía

    const handleRegister = async (e) => {
    e.preventDefault();
    setErrMessage("");
    console.log("🔑 Token en paso 4:", authToken);
    const cardRegex = /^\d{16}$/;

    if (!registerData.tarjeta_credito || !registerData.codigo_postal) {
        setErrMessage("Los datos de pago son obligatorios.");
        return;
    } else if (!cardRegex.test(registerData.tarjeta_credito)) {
        setErrMessage("La tarjeta debe tener 16 dígitos.");
        return;
    }

    setIsLoading(true);
    setLoadPage(true);
    try {
        //  Guarda tarjeta y código postal
          await updateClientInfo(
            parseInt(registerData.tarjeta_credito),
            parseInt(registerData.codigo_postal),
            authToken
        );

        // Crea la membresía
       await createMembership(authToken); 
    
        // Genera el código de seguridad
        await createSecurityCode(authToken);

        toast.success(`¡Registro exitoso! Revisa tu correo: ${registerData.email}`, {
            position: "top-center",
            autoClose: 6000,
        });
        sessionStorage.removeItem('reg_token');   
        sessionStorage.removeItem('reg_step'); 
        sessionStorage.removeItem('reg_data');    
        setTimeout(() => navigate('/login'), 3000);
         
    } catch (err) {
        console.error("Error en registro", err);
        toast.error("Ocurrió un error al intentar registrar.");
    } finally {
        setIsLoading(false);
        setLoadPage(false); 
    }
};

    // --- RENDERIZADO DEL COMPONENTE ---

    return (
        <section className='auth-form'>
            <ToastContainer /> {/* Revisar si la posicion de toast container está bien!!!!!!*/ }
            <form onSubmit={handleRegister}>
                
                {errMessage && <p style={{ color: 'red', fontWeight: 'bold' }}>{errMessage}</p>}

                {/* INDICADOR DE PASOS (STEPPER) */}
                <div className="step-indicator">
                    {[1, 2, 3, 4].map((num) => (
                        <React.Fragment key={num}>
                            <div className="step-item">
                                <div className={`circle ${step >= num ? 'active' : ''}`}>
                                    {num}
                                </div>
                            </div>
                            {/* La línea que conecta (no aparece después del 4) */}
                            {num < 4 && <div className={`line ${step > num ? 'active' : ''}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                {/* CONTENIDO DINÁMICO POR PASOS */}
                {/* PASO 1: Identidad (Nombre, Apellido, Cédula) */}
                {step === 1 && (
                    <div className="form-step">
                        <input type="text" placeholder='Nombre' value={registerData.nombre} onChange={(e) => setRegister({ ...registerData, nombre: e.target.value })} />
                        <input type="text" placeholder='Apellido' value={registerData.apellido} onChange={(e) => setRegister({ ...registerData, apellido: e.target.value })} />
                        <input type="text" placeholder='Cédula' value={registerData.dni} onChange={(e) => setRegister({ ...registerData, dni: e.target.value })} />
                        <button type="button" onClick={handleNext1}>Siguiente</button>
                    </div>
                )}

                {/* PASO 2: Acceso (Email y Contraseña) */}
               {step === 2 && (
    <div className="form-step">
        <input type="email" placeholder='Email' value={registerData.email} onChange={(e) => setRegister({ ...registerData, email: e.target.value })} />
        <input type="password" placeholder='Contraseña' value={registerData.password} onChange={(e) => setRegister({ ...registerData, password: e.target.value })} />
        <input type="password" placeholder='Confirmar Contraseña' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        {isLoading && <Loading />}
        <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" onClick={() => setStep(1)} disabled={isLoading}>Atrás</button>
            <button type="button" onClick={handleNext2} disabled={isLoading}>
                {isLoading ? 'Cargando...' : 'Siguiente'}
            </button>
        </div>
    </div>
)}
               {step === 3 && (
    <div className="form-step">
        <p style={{ fontSize: '17px' }}> Elige 3 preguntas de seguridad y escribe tu respuesta. 
    Las necesitarás si algún día olvidas tu <b>código de seguridad</b></p>

       {registerData.securityAnswers.map((r, i) => (
    <div key={i} className="question-card">
        <span className="question-label">Pregunta {i + 1}</span>
        <select
            value={r.idQuestion}
            onChange={(e) => {
                const nuevas = [...registerData.securityAnswers];
                nuevas[i].idQuestion = e.target.value;
                setRegister({ ...registerData, securityAnswers: nuevas });
            }}
        >
            <option value="">-- Pregunta {i + 1} --</option>
            {preguntasBackend?.length > 0 ? (
                preguntasBackend.map(p => (
                    <option key={p.idQuestion} value={p.idQuestion}>
                        {p.wording}
                    </option>
                ))
            ) : (
                <option disabled>No hay preguntas disponibles</option>
            )}
        </select>
        <input
            type="text"
            placeholder="Tu respuesta"
            value={r.answer}
            onChange={(e) => {
                const nuevas = [...registerData.securityAnswers];
                nuevas[i].answer = e.target.value;
                setRegister({ ...registerData, securityAnswers: nuevas });
            }}
        />
    </div>
))}
            {isLoading && <Loading/>}
          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
      
<button type="button" onClick={handleNext3} disabled={isLoading}>
    {isLoading ? 'Guardando...' : 'Siguiente'}
</button>
            </div>
            </div>
)}

                {/* PASO 4: Pago de Membresía ($10) */}
{step === 4 && (
    <div className="form-step" style={{ maxHeight: '380px', overflowY: 'auto' }}>
        <p style={{ fontSize: '13px', color: '#555', textAlign: 'center', marginBottom: '12px' }}>
            Se realizará un cobro único de <b>$10</b> por tu membresía. Al completar el pago, 
            recibirás en tu correo un <b>código de seguridad</b> que usarás para reservar obras y realizar compras.
        </p>
        <input type="text" placeholder='Tarjeta de Crédito (16 dígitos)' value={registerData.tarjeta_credito} onChange={(e) => setRegister({ ...registerData, tarjeta_credito: e.target.value })} />
        <input type="text" placeholder='Código Postal' value={registerData.codigo_postal} onChange={(e) => setRegister({ ...registerData, codigo_postal: e.target.value })} />
        {isLoading && <Loading />}
<input 
    type="submit" 
    value={isLoading ? 'Procesando...' : 'Registrar'} 
    disabled={isLoading} 
/>
    </div>
)}

            </form>
        </section>
    );
}

export default Sign;