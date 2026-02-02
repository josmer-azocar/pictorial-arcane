import './MainAuth.css'
import { useState } from 'react';
import {logUser} from '../../services/authUser.js'


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrMsg("");

        try {
            const data = await logUser({email, password});
            console.log('Fetch Exitoso ', data);
        } catch (err) {
            setErrMsg("Revisa tus datos de usuario");
        }

    }
    return(
        <section className='auth-form'>
            <form onSubmit={handleLogin}>
                {errorMessage && <p>{errorMessage}</p>}
                <input type="text" id="emaillog" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/><br/>
                <input type="password" id="passwordlog" name="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)}/><br/>
                <input type="submit" className='sub-button' value="Entrar"/>                
            </form>
        </section>
    );
}

export default Login