import './MainAuth.css';
import React, { useState } from 'react';
import { registerUser } from '../../services/authUser.js';
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

    const handleNext2 = () => {
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
        setStep(3);
    };

    const handleNext3 = () => {
        setErrMessage("");
        if (!registerData.pregunta1 || !registerData.pregunta2 || !registerData.pregunta3) {
            setErrMessage("Responde todas las preguntas de seguridad.");
            return;
        }
        setStep(4);
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
            await registerUser(registerData);
            toast.success(`¡Registro exitoso! Revisa tu correo: ${registerData.email}`, {
                position: "top-center",
                autoClose: 6000,
            });
        } catch (err) {
            console.error("Error en registro", err);
            toast.error("Ocurrió un error al intentar registrar.");
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
                        <h3>Paso 1: Identidad</h3>
                        <input type="text" placeholder='Nombre' value={registerData.nombre} onChange={(e) => setRegister({ ...registerData, nombre: e.target.value })} />
                        <input type="text" placeholder='Apellido' value={registerData.apellido} onChange={(e) => setRegister({ ...registerData, apellido: e.target.value })} />
                        <input type="text" placeholder='Cédula' value={registerData.dni} onChange={(e) => setRegister({ ...registerData, dni: e.target.value })} />
                        <button type="button" onClick={handleNext1}>Siguiente</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="form-step">
                        <h3>Paso 2: Cuenta</h3>
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
                        <h3>Paso 3: Seguridad</h3>
                        <p style={{ fontSize: '12px' }}>Preguntas de recuperación:</p>
                        <input type="text" placeholder='¿Nombre de tu mascota?' value={registerData.pregunta1} onChange={(e) => setRegister({ ...registerData, pregunta1: e.target.value })} />
                        <input type="text" placeholder='¿Ciudad de nacimiento?' value={registerData.pregunta2} onChange={(e) => setRegister({ ...registerData, pregunta2: e.target.value })} />
                        <input type="text" placeholder='¿Escuela primaria?' value={registerData.pregunta3} onChange={(e) => setRegister({ ...registerData, pregunta3: e.target.value })} />
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button type="button" onClick={() => setStep(2)}>Atrás</button>
                            <button type="button" onClick={handleNext3}>Siguiente</button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="form-step">
                        <h3>Paso 4: Pago</h3>
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