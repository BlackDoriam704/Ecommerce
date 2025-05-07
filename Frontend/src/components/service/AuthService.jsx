const API_URL = 'https://shiny-space-journey-5g47xrgpjr9927j5v-8101.app.github.dev/users/login';

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al iniciar sesión');
  }

  const { token } = await response.json();
  localStorage.setItem('authToken', token); // Guarda el token en localStorage
  return token;
};

export const logout = () => {
  localStorage.removeItem('authToken'); // Elimina el token del almacenamiento
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken'); // Obtiene el token del almacenamiento
};