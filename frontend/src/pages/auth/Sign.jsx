import { useState } from 'react';
import {registerUser} from '../../services/authUser.js'

function Sign() {
    const [registerData, setRegister] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        password: "" 
    });

    const [errMessage, setErrMessage] = useState("");

    const handleRegister = async (e) =>{
        e.preventDefault();
        setErrMessage("");

        const passwordMatch = e.target.elements.cpassword.value;

        if (registerData.password !== passwordMatch) {
            setErrMessage("Las contraseñas no son las mismas");
            return;
        } else if (registerData.password.length < 8) {
            setErrMessage("La contraseña debe tener por lo menos 8 caracteres");
            return;
        }
        try {
            const result = await registerUser(registerData);
            console.log("Usuario creado", result);
            
        } catch (err) {
            console.error("No se pudo registrar", err);
        }
    }



    return(
        <section className='auth-form'>
            <form onSubmit={handleRegister}>
                {errMessage && <p>{errMessage}</p>}
                <label htmlFor="fname">Nombre:</label>
                <input type="text" id="fname" name="fname" onChange={(e)=>setRegister({...registerData, nombre: e.target.value})}/><br/>
                <label htmlFor="lname">Apellido:</label>
                <input type="text" id="lname" name="lname" onChange={(e)=>setRegister({...registerData, apellido: e.target.value})}/><br/>
                <label htmlFor="dni">Cédula:</label>
                <input type="number" id="dni" name="dni" onChange={(e)=>setRegister({...registerData, dni: e.target.value})}/><br/>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" onChange={(e)=>setRegister({...registerData, email: e.target.value})}/><br/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password" onChange={(e)=>setRegister({...registerData, password:e.target.value})}/><br/>
                <label htmlFor="cpassword">Confirmar contraseña</label>
                <input type="password" id="cpassword" name="cpassword"/><br/>
                <input type="submit" value="Submit"/>
                
            </form>
        </section>
    );
}

export default Sign