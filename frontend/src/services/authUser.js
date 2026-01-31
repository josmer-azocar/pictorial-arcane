export async function logUser(){
    const url = "http://localhost:8080/api/login";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            throw new Error(response.status); //fetch no detecta si la contraseña es incorrecta o el server falla como error por lo que no se va a catch directamente
            
        }

        return await response.json();

    } catch (error) {
        console.error("Error de servicio:", error);
        throw error;
    }
}

/*export async function logUser(credentials) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === "test@test.com" && credentials.password === "1234") {
        resolve({
          status: "success",
          user: { name: "Tester", email: "test@test.com" },
          token: "fake-jwt-token-123"
        });
        console.log("Exito");
      } else {
        reject(new Error("Email o contraseña equivocados"));
      }
    }, 1500);
  });
}*/

//funcion para hacer pruebas