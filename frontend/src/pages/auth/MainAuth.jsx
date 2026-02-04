import './MainAuth.css'
import Login from './Login.jsx'
import Sign from './Sign.jsx'
import { useState } from 'react';

function MainAuth() {

    const [isLogin, setAuthPage] = useState(true);

    return (
     <div className="auth-page-wrapper">
        <section className='auth-form'>
            <div id='auth-buttons'>
                <button onClick={()=> setAuthPage(true)}>Login</button>
                <button onClick={()=> setAuthPage(false)}>Sign Up</button>
            </div>

            {isLogin? <Login/> : <Sign/>}            
        </section>
     </div>
    );
}

export default MainAuth