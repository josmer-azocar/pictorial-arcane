import './MainAuth.css';
import { useState } from 'react';
import {registerUser} from '../../services/authUser.js';
import { useNavigate } from 'react-router-dom';

function Sign() {
    const [registerData, setRegister] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        password: "" 
    });

    const [errMessage, setErrMessage] = useState("");
    const [loadPage, setLoadPage] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) =>{
        e.preventDefault();
        setErrMessage("");
        setLoadPage(true);

        const passwordMatch = e.target.elements.cpassword.value;
        const regex = /[0-9!@#$%^&*]/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const dniRegex = /^\d+$/;

        if (!registerData.nombre || !registerData.apellido || !registerData.dni || !registerData.email || !registerData.password) {
            setErrMessage("Tienes que llenar todos los campos");
            return;
        } else if(!dniRegex.test(registerData.dni)) {
            setErrMessage("La cédula solo puede contener números");
            return;
        } else if(Number(registerData.dni) < 900000){
            setErrMessage("Número de cédula inváido");
            return;
        } else if (!emailRegex.test(registerData.email)) {
            setErrMessage("Debes colocar un correo válido");
            return;
        } else if (registerData.password !== passwordMatch) {
            setErrMessage("Las contraseñas no son las mismas");
            return;
        } else if (registerData.password.length < 8) {
            setErrMessage("La contraseña debe tener por lo menos 8 caracteres");
            return;
        } else if (!regex.test(registerData.password)) {
            setErrMessage("La contraseña necesita por lo menos un caracter especial (!@#$%^&*) o un número");
            return;
        } 
        try {
            const result = await registerUser(registerData);
            console.log("Usuario creado", result);
            navigate("/auth/login");
            
        } catch (err) {
            console.error("No se pudo registrar", err);
        }
    }



    return(
        <section className='auth-form'>
            <form onSubmit={handleRegister}>
                {errMessage && <p>{errMessage}</p>}
                <input type="text" id="fname" name="fname" placeholder='Nombre' onChange={(e)=>setRegister({...registerData, nombre: e.target.value})}/><br/>
                <input type="text" id="lname" name="lname" placeholder='Apellido' onChange={(e)=>setRegister({...registerData, apellido: e.target.value})}/><br/>
                <input type="number" id="dni" name="dni" placeholder='Cédula' onChange={(e)=>setRegister({...registerData, dni: e.target.value})}/><br/>
                <input type="text" id="email" name="email"  placeholder='Email' onChange={(e)=>setRegister({...registerData, email: e.target.value})}/><br/>
                <input type="password" id="password" name="password" placeholder='Contraseña' onChange={(e)=>setRegister({...registerData, password:e.target.value})}/><br/>
                <input type="password" id="cpassword" name="cpassword" placeholder='Confirmar Contraseña'/><br/>
                <input type="submit" value="Registrar" className='sub-button'/>
                
            </form>
        </section>
    );
}

export default Sign