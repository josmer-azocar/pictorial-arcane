
function Sign() {
    return(
        <section className='auth-form'>
            <form>
                <label htmlFor="name">Nombre:</label>
                <input type="text" id="name" name="name"/><br/>
                <label htmlFor="lname">Apellido:</label>
                <input type="text" id="lname" name="lname"/><br/>
                <label htmlFor="dni">Cédula:</label>
                <input type="number" id="dni" name="dni"/><br/>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email"/><br/>
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" name="password"/><br/>
                <label htmlFor="cpassword">Confirmar contraseña</label>
                <input type="password" id="cpassword" name="cpassword"/><br/>
                <input type="submit" value="Submit"/>
                
            </form>
        </section>
    );
}

export default Sign