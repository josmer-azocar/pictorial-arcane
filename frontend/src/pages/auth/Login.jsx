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
                <label htmlFor="emaillog">Email</label>
                <input type="text" id="emaillog" name="email" onChange={(e) => setEmail(e.target.value)}/><br/>
                <label htmlFor="passwordlog">Contraseña</label>
                <input type="password" id="passwordlog" name="password" onChange={(e) => setPassword(e.target.value)}/><br/>
                <input type="submit" value="Submit"/>                
            </form>
        </section>
    );
}

export default Login