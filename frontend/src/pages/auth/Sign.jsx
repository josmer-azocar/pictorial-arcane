import './MainAuth.css'
import { useState } from 'react';
import { registerUser } from '../../services/authUser.js'

function Sign() {
    // Estado inicial: Mantenemos tus nombres de variables y agregamos las preguntas de seguridad
    const [registerData, setRegister] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        tarjeta_credito: "", 
        codigo_postal: "",   
        email: "",
        password: "",
        // Nuevos campos necesarios para la tarea de Josue (Recuperación de código)
        pregunta1: "",
        pregunta2: "",
        pregunta3: ""
    });

    const [errMessage, setErrMessage] = useState("");
    const [step, setStep] = useState(1);

    // PASO 1: Validación de Identidad Básica
    const handleNext1 = () => {
        setErrMessage(""); 
        const dniRegex = /^\d+$/; // Validar que la cédula sea numérica

        if (!registerData.nombre || !registerData.apellido || !registerData.dni) {
            setErrMessage("Por favor, completa tus datos personales para continuar.");
            return;
        } else if (!dniRegex.test(registerData.dni)) {
            setErrMessage("La cédula solo puede contener números.");
            return;
        }

        setStep(2);
    }

    // PASO 2: Validación de Cuenta de Acceso
    const handleNext2 = () => {
        setErrMessage("");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!registerData.email || !registerData.password) {
            setErrMessage("Tienes que llenar el correo y la contraseña.");
            return;
        } else if (!emailRegex.test(registerData.email)) {
            setErrMessage("Debes colocar un correo válido.");
            return;
        } else if (registerData.password.length < 8) {
            setErrMessage("La contraseña debe tener por lo menos 8 caracteres.");
            return;
        }
        setStep(3);
    }

    // PASO 3: Validación de Seguridad de Recuperación (Tarea de Josue)
    const handleNext3 = () => {
        setErrMessage("");
        // Verificamos que las 3 preguntas tengan respuesta
        if (!registerData.pregunta1 || !registerData.pregunta2 || !registerData.pregunta3) {
            setErrMessage("Debes responder las preguntas de seguridad para poder recuperar tu código después.");
            return;
        }
        setStep(4);
    }

    // PASO 4: Registro Final y Pago de Membresía
    const handleRegister = async (e) =>{
        e.preventDefault();
        setErrMessage("");

        const passwordMatch = e.target.elements.cpassword.value;
        const cardRegex = /^\d{16}$/;
        const specialCharRegex = /[0-9!@#$%^&*]/;

        // Validaciones finales de tarjeta y contraseña
        if (!registerData.tarjeta_credito || !registerData.codigo_postal) {
            setErrMessage("Los datos de pago son obligatorios.");
            return;
        } else if (!cardRegex.test(registerData.tarjeta_credito)) {
            setErrMessage("La tarjeta debe tener 16 dígitos.");
            return;
        }

        if (registerData.password !== passwordMatch) {
            setErrMessage("Las contraseñas no son las mismas.");
            return;
        } else if (!specialCharRegex.test(registerData.password)) {
            setErrMessage("La contraseña necesita por lo menos un caracter especial (!@#$%^&*) o un número.");
            return;
        } 
        
        try {
            const result = await registerUser(registerData);
            console.log("Usuario creado", result);
            // Aviso de éxito y membresía de $10 cobrada
            alert("¡Registro exitoso! Se han cobrado $10 de membresía. Revisa tu correo para obtener tu código de seguridad.");
        } catch (err) {
            console.error("No se pudo registrar", err);
            setErrMessage("Ocurrió un error al intentar registrar.");
        }
    }

    return(
        <section className='auth-form'>
            <form onSubmit={handleRegister}>
                {errMessage && <p style={{color: 'red', fontWeight: 'bold'}}>{errMessage}</p>}
                <div className="step-indicator">
  {[1, 2, 3, 4].map((num) => (
    <div key={num} className="step-item">
      {/* El círculo con el número */}
      <div className={`circle ${step >= num ? 'active' : ''}`}>
        {num}
      </div>
      {/* La línea que conecta (no aparece después del 4) */}
      {num < 4 && <div className={`line ${step > num ? 'active' : ''}`}></div>}
    </div>
  ))}
</div>




                {/* PASO 1: Identidad (Nombre, Apellido, Cédula) */}
                {step === 1 && (
                    <div className="form-step">
                        <h3>Paso 1: Identidad</h3>
                        <input type="text" placeholder='Nombre' value={registerData.nombre} onChange={(e)=>setRegister({...registerData, nombre: e.target.value})}/><br/>
                        <input type="text" placeholder='Apellido' value={registerData.apellido} onChange={(e)=>setRegister({...registerData, apellido: e.target.value})}/><br/>
                        <input type="text" placeholder='Cédula' value={registerData.dni} onChange={(e)=>setRegister({...registerData, dni: e.target.value})}/><br/>
                        <button type="button" onClick={handleNext1} className='sub-button'>Siguiente</button>
                    </div>
                )}

                {/* PASO 2: Acceso (Email y Contraseña) */}
                {step === 2 && (
                    <div className="form-step">
                        <h3>Paso 2: Cuenta</h3>
                        <input type="text" placeholder='Email' value={registerData.email} onChange={(e)=>setRegister({...registerData, email: e.target.value})}/><br/>
                        <input type="password" placeholder='Contraseña' value={registerData.password} onChange={(e)=>setRegister({...registerData, password:e.target.value})}/><br/>
                        <input type="password" id="cpassword" name="cpassword" placeholder='Confirmar Contraseña'/><br/>
                        <div style={{display: "flex", gap: "10px"}}>
                            <button type="button" onClick={() => setStep(1)} className='sub-button'>Atrás</button>
                            <button type="button" onClick={handleNext2} className='sub-button'>Siguiente</button>
                        </div>
                    </div>
                )}

                {/* PASO 3: Recuperación (Preguntas de Seguridad) */}
                {step === 3 && (
                    <div className="form-step">
                        <h3>Paso 3: Seguridad</h3>
                        <p style={{fontSize: '12px'}}>Responde estas preguntas para recuperar tu código de acceso.</p>
                        <input type="text" placeholder='¿Nombre de tu mascota?' value={registerData.pregunta1} onChange={(e)=>setRegister({...registerData, pregunta1: e.target.value})}/><br/>
                        <input type="text" placeholder='¿Ciudad de nacimiento?' value={registerData.pregunta2} onChange={(e)=>setRegister({...registerData, pregunta2: e.target.value})}/><br/>
                        <input type="text" placeholder='¿Escuela primaria?' value={registerData.pregunta3} onChange={(e)=>setRegister({...registerData, pregunta3: e.target.value})}/><br/>
                        <div style={{display: "flex", gap: "10px"}}>
                            <button type="button" onClick={() => setStep(2)} className='sub-button'>Atrás</button>
                            <button type="button" onClick={handleNext3} className='sub-button'>Siguiente</button>
                        </div>
                    </div>
                )}

                {/* PASO 4: Pago de Membresía ($10) */}
                {step === 4 && (
                    <div className="form-step">
                        <h3>Paso 4: Pago</h3>
                        <p style={{ fontSize: '14px', marginBottom: '15px' }}>
                            Para activar tu cuenta debes pagar una membresía de $10. <br/>
                            Recibirás tu código de seguridad en el correo tras el pago.
                        </p>
                        <input type="text" placeholder='Nro de Tarjeta de Crédito (16 dígitos)' value={registerData.tarjeta_credito} onChange={(e)=>setRegister({...registerData, tarjeta_credito: e.target.value})}/><br/>
                        <input type="text" placeholder='Código Postal' value={registerData.codigo_postal} onChange={(e)=>setRegister({...registerData, codigo_postal: e.target.value})}/><br/>
                        <div style={{display: "flex", gap: "10px"}}>
                            <button type="button" onClick={() => setStep(3)} className='sub-button'>Atrás</button>
                            <input type="submit" value="Registrar y Pagar $10" className='sub-button'/>
                        </div>
                    </div>
                )}
            </form>
        </section>
    );
}

export default Sign;