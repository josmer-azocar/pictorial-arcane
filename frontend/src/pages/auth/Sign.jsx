import './MainAuth.css';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        pregunta1: "",
        pregunta2: "",
        pregunta3: ""
    });

    const [errMessage, setErrMessage] = useState("");
    const [step, setStep] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [authToken, setAuthToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [preguntasBackend, setPreguntasBackend] = useState([]);
    const [respuestas, setRespuestas] = useState([
    { idQuestion: "", answer: "" },
    { idQuestion: "", answer: "" },
    { idQuestion: "", answer: "" },
]);
//trae las preguntas del backend al llegar al paso 3
useEffect(() => {
        if (step === 3) {
            fetch('http://localhost:8080/questions/getAllQuestions')
                .then(res => res.json())
                .then(data => setPreguntasBackend(data))
                .catch(err => console.error("Error al obtener preguntas:", err));
        }
    }, [step]);

    // --- FUNCIONES DE NAVEGACIÓN Y VALIDACIÓN ---

    const handleNext1 = () => {
        setErrMessage("");
        const dniRegex = /^\d+$/;
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
    if (!registerData.email || !registerData.password) {
        setErrMessage("Completa el correo y la contraseña.");
        return;
    } else if (!emailRegex.test(registerData.email)) {
        setErrMessage("Debes colocar un correo válido.");
        return;
    } else if (registerData.password.length < 8) {
        setErrMessage("La contraseña debe tener al menos 8 caracteres.");
        return;
    }
    
 setIsLoading(true);
    try {
        const res = await fetch('http://localhost:8080/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                dniUser: parseInt(registerData.dni),
                email: registerData.email,
                password: registerData.password,
                firstName: registerData.nombre,
                lastName: registerData.apellido,
                role: 'CLIENT'
            })
        });
        const data = await res.json();
        setAuthToken(data.token);
        setStep(3);
    } catch (err) {
         console.error("Error al crear la cuenta:", err); 
    } finally {
        setIsLoading(false);
    }

    };

  const handleNext3 = async () => {
    setErrMessage("");

    const incompletas = respuestas.some(r => !r.idQuestion || !r.answer.trim());
    if (incompletas) {
        setErrMessage("Selecciona una pregunta y escribe tu respuesta en cada campo.");
        return;
    }

    setIsLoading(true);
    try {
        for (const r of respuestas) {
            // Llamada 1: PUT /questions/updateQuestion?questionId=4  body: "Rocky"
            await fetch(`http://localhost:8080/questions/updateQuestion?questionId=${r.idQuestion}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(r.answer) // Solo envía la respuesta como string
            });
        }
        setStep(4);
    } catch (err) {
        setErrMessage("Error al guardar las preguntas.");
    } finally {
        setIsLoading(false);
    }
};

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrMessage("");
        const cardRegex = /^\d{16}$/;
        const specialCharRegex = /[0-9!@#$%^&*]/;

        if (!registerData.tarjeta_credito || !registerData.codigo_postal) {
            setErrMessage("Los datos de pago son obligatorios.");
            return;
        } else if (!cardRegex.test(registerData.tarjeta_credito)) {
            setErrMessage("La tarjeta debe tener 16 dígitos.");
            return;
        }

        if (registerData.password !== confirmPassword) {
            setErrMessage("Las contraseñas no coinciden.");
            return;
        } else if (!specialCharRegex.test(registerData.password)) {
            setErrMessage("La contraseña requiere un carácter especial o número.");
            return;
        }

        try {
           //Envía tarjeta y código postal
        await fetch('http://localhost:8080/client/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({
                creditCardNumber: parseInt(registerData.tarjeta_credito),
                postalCode: parseInt(registerData.codigo_postal)
            })
        });

        // Genera el código de seguridad y lo envía al correo
        await fetch('http://localhost:8080/client/createSecurityCode', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        toast.success(`¡Registro exitoso! Revisa tu correo: ${registerData.email}`, {
            position: "top-center",
            autoClose: 6000,
        });

        } catch (err) {
            console.error("Error en registro", err);
            toast.error("Ocurrió un error al intentar registrar.");
        }finally {
        setIsLoading(false);
    }
    };

    // --- RENDERIZADO DEL COMPONENTE ---

    return (
        <section className='auth-form'>
            <ToastContainer />
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
                            {num < 4 && <div className={`line ${step > num ? 'active' : ''}`}></div>}
                        </React.Fragment>
                    ))}
                </div>

                {/* CONTENIDO DINÁMICO POR PASOS */}
                
                {step === 1 && (
                    <div className="form-step">
                        <input type="text" placeholder='Nombre' value={registerData.nombre} onChange={(e) => setRegister({ ...registerData, nombre: e.target.value })} />
                        <input type="text" placeholder='Apellido' value={registerData.apellido} onChange={(e) => setRegister({ ...registerData, apellido: e.target.value })} />
                        <input type="text" placeholder='Cédula' value={registerData.dni} onChange={(e) => setRegister({ ...registerData, dni: e.target.value })} />
                        <button type="button" onClick={handleNext1}>Siguiente</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step">
                        <input type="email" placeholder='Email' value={registerData.email} onChange={(e) => setRegister({ ...registerData, email: e.target.value })} />
                        <input type="password" placeholder='Contraseña' value={registerData.password} onChange={(e) => setRegister({ ...registerData, password: e.target.value })} />
                        <input type="password" placeholder='Confirmar Contraseña' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button type="button" onClick={() => setStep(1)}>Atrás</button>
                            <button type="button" onClick={handleNext2}>Siguiente</button>
                        </div>
                    </div>
                )}

               {step === 3 && (
    <div className="form-step">
        <p style={{ fontSize: '17px' }}> Elige 3 preguntas de seguridad y escribe tu respuesta. 
    Las necesitarás si algún día olvidas tu <b>código de seguridad</b></p>

        {respuestas.map((r, i) => (
            <div key={i} className="question-card">
                <span className="question-label">Pregunta {i + 1}</span>
                <select
                    value={r.idQuestion}
                    onChange={(e) => {
                        const nuevas = [...respuestas];
                        nuevas[i].idQuestion = e.target.value;
                        setRespuestas(nuevas);
                    }}
                >
                    <option value="">-- Pregunta {i + 1} --</option>
                    {preguntasBackend.map(p => (
                        <option key={p.idQuestion} value={p.idQuestion}>
                            {p.wording}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Tu respuesta"
                    value={r.answer}
                    onChange={(e) => {
                        const nuevas = [...respuestas];
                        nuevas[i].answer = e.target.value;
                        setRespuestas(nuevas);
                    }}
                />
            </div>
        ))}

        <div style={{ display: "flex", gap: "10px" }}>
            <button type="button" onClick={() => setStep(2)}>Atrás</button>
            <button type="button" onClick={handleNext3} disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Siguiente'}
            </button>
        </div>
    </div>
)}

                {step === 4 && (
                    <div className="form-step">
                        <p style={{ fontSize: '14px' }}>Membresía de activación: <b>$10</b></p>
                        <input type="text" placeholder='Tarjeta de Crédito (16 dígitos)' value={registerData.tarjeta_credito} onChange={(e) => setRegister({ ...registerData, tarjeta_credito: e.target.value })} />
                        <input type="text" placeholder='Código Postal' value={registerData.codigo_postal} onChange={(e) => setRegister({ ...registerData, codigo_postal: e.target.value })} />
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button type="button" onClick={() => setStep(3)}>Atrás</button>
                            <input type="submit" value="Pagar $10 y Registrar" />
                        </div>
                    </div>
                )}

            </form>
        </section>
    );
}

export default Sign;