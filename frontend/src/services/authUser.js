import axios from 'axios';

// we keep two base URLs: one for auth endpoints and one general server url
const authUrl = "http://localhost:8080/auth";
const baseUrl = "http://localhost:8080";

/*export async function logUser(credentials) {
    const response = await axios.post(`${authUrl}/login`, credentials);
    return response.data;
}*/

// register a new user - used during handleNext2 in Sign.jsx
export async function registerUser(registerData) {
    // registerData should match the DTO expected by the backend
    const response = await axios.post(`${authUrl}/register`, registerData);
    return response.data; // caller will handle token, etc.
}

// update a single security question answer for the authenticated client
export async function updateSecurityAnswer(questionId, answer, token) {
    const response = await axios.put(
        `${baseUrl}/questions/updateQuestion?questionId=${questionId}`,
        answer,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

// update client payment/membership information
export async function updateClientInfo(creditCardNumber, postalCode, token) {
    const response = await axios.put(
        `${baseUrl}/client/update`,
        { creditCardNumber, postalCode },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

// create a security code for the client after registration
export async function createSecurityCode(token) {
    const response = await axios.post(
        `${baseUrl}/client/createSecurityCode`,
        null,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response.data;
}

// fetch authenticated user's profile (existing getUserPfp uses /dashboard but we keep same)
export async function fetchUserProfile(token) {
    const response = await axios.get(`${baseUrl}/dashboard`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}


export async function logUser(credentials) {
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
}

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

