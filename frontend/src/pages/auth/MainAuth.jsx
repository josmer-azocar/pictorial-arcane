import './MainAuth.css'
import Login from './Login.jsx'
import Sign from './Sign.jsx'
import { useState } from 'react';

function MainAuth() {

    const [isLogin, setAuthPage] = useState(true);

    return (
        <section className='auth-form'>
            <section id='log-click'>
                <div id='auth-buttons'>
                    <button onClick={()=> setAuthPage(true)}>Login</button>
                    <button onClick={()=> setAuthPage(false)}>Sign Up</button>                   
                </div>
                {isLogin? <Login/> : <Sign/>}
            </section>
            <section id='auth-welcome'>  
                <div id='text-welcome'>
                    <p>¡Bienvenido!</p><br/>
                    <p>Disfuta de nuestra colección de artistas y adquiere piezas únicas al formar parte de nuestra comunidad</p>
                </div>  
            </section>
        </section>
    );
}

export default MainAuth