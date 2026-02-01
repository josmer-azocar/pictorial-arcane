import './MainAuth.css'
import Login from './Login.jsx'
import Sign from './Sign.jsx'
import { useState } from 'react';

function MainAuth() {

    const [isLogin, setAuthPage] = useState(true);

    return (
        <section className='auth-form'>
            <div id='auth-buttons'>
                <button onClick={()=> setAuthPage(true)}>Login</button>
                <button onClick={()=> setAuthPage(false)}>Sign Up</button>
            </div>

            {isLogin? <Login/> : <Sign/>}            
        </section>
    );
}

export default MainAuth