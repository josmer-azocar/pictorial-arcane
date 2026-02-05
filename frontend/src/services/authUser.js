import axios from 'axios';
const url = "http://localhost:8080/auth";


export async function logUser(credentials){

    const response = await axios.post(`${url}/login`, credentials);
    return response.data;
}

export async function registerUser(credentials) {
    const response = await axios.post(`${url}/signUp`, userData);
    return response.data;
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

/*export async function registerUser(credentials) {
    console.log("Registro de prueba:", credentials);
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
        success: true,
        message: "Usuario creado (MOCK)",
        user: credentials.nombre
    };
}*/